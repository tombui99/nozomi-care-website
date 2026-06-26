import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  collection,
  type DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from '../firebase';
import { NewsCard } from './NewsCard';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categories = [
  'All Posts',
  'Tin tức và Sự kiện',
  'Cẩm nang sức khoẻ',
  'Khuyến mãi'
];

const PAGE_SIZE = 9;
const CATEGORY_SCAN_BATCH_SIZE = 24;

interface NewsArticle {
  id: string;
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  category?: string;
}

const mapArticles = (docs: QueryDocumentSnapshot<DocumentData>[]) => (
  docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as NewsArticle[]
);

const getPageCacheKey = (category: string, page: number) => `${category}:${page}`;

const isMissingIndexError = (error: unknown) => (
  typeof error === 'object'
  && error !== null
  && (
    ('code' in error && error.code === 'failed-precondition')
    || ('message' in error && String(error.message).toLowerCase().includes('index'))
  )
);

export const NewsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const requestIdRef = useRef(0);
  const pageCacheRef = useRef<Record<string, NewsArticle[]>>({});
  const totalPagesCacheRef = useRef<Record<string, number>>({});
  const pageCursorsRef = useRef<Record<string, Record<number, QueryDocumentSnapshot<DocumentData> | null>>>({});

  const categoryKeys: Record<string, string> = {
    'All Posts': 'news.categories.all',
    'Tin tức và Sự kiện': 'news.categories.news',
    'Cẩm nang sức khoẻ': 'news.categories.health',
    'Khuyến mãi': 'news.categories.promo'
  };

  const paginationItems = useMemo(
    () => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      }

      const nearbyPages = [currentPage - 1, currentPage, currentPage + 1]
        .filter(page => page > 1 && page < totalPages);
      const pages = [1, ...nearbyPages, totalPages];
      const uniquePages = [...new Set(pages)].sort((a, b) => a - b);

      return uniquePages.flatMap((page, index) => {
        const previousPage = uniquePages[index - 1];

        if (previousPage && page - previousPage > 1) {
          return ['...', page];
        }

        return [page];
      });
    },
    [currentPage, totalPages]
  );

  const fetchIndexedPage = useCallback(async (category: string, page: number) => {
    let cursorMap = pageCursorsRef.current[category] ?? { 1: null };
    let closestPage = page;

    while (closestPage > 1 && !(closestPage in cursorMap)) {
      closestPage -= 1;
    }

    let cursor = cursorMap[closestPage] ?? null;

    for (let pageToFetch = closestPage; pageToFetch <= page; pageToFetch += 1) {
      const constraints: QueryConstraint[] = [];

      if (category !== 'All Posts') {
        constraints.push(where('category', '==', category));
      }

      constraints.push(orderBy('createdAt', 'desc'));

      if (cursor) {
        constraints.push(startAfter(cursor));
      }

      constraints.push(limit(PAGE_SIZE));

      const querySnapshot = await getDocs(query(collection(db, 'news'), ...constraints));
      const docs = querySnapshot.docs;
      cursor = docs.at(-1) ?? null;
      cursorMap = { ...cursorMap, [pageToFetch + 1]: cursor };

      if (pageToFetch === page) {
        pageCursorsRef.current = {
          ...pageCursorsRef.current,
          [category]: cursorMap
        };
        return mapArticles(docs);
      }
    }

    pageCursorsRef.current = {
      ...pageCursorsRef.current,
      [category]: cursorMap
    };
    return [];
  }, []);

  const fetchCategoryPageFallback = useCallback(async (category: string, page: number) => {
    const neededMatches = page * PAGE_SIZE;
    const matchingDocs: QueryDocumentSnapshot<DocumentData>[] = [];
    let cursor: QueryDocumentSnapshot<DocumentData> | null = null;

    while (matchingDocs.length < neededMatches) {
      const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

      if (cursor) {
        constraints.push(startAfter(cursor));
      }

      constraints.push(limit(CATEGORY_SCAN_BATCH_SIZE));

      const querySnapshot = await getDocs(query(collection(db, 'news'), ...constraints));

      if (querySnapshot.empty) {
        break;
      }

      matchingDocs.push(...querySnapshot.docs.filter(doc => doc.data().category === category));
      cursor = querySnapshot.docs.at(-1) ?? null;

      if (querySnapshot.docs.length < CATEGORY_SCAN_BATCH_SIZE) {
        break;
      }
    }

    return mapArticles(matchingDocs.slice((page - 1) * PAGE_SIZE, neededMatches));
  }, []);

  const fetchArticlesPage = useCallback(async (category: string, page: number) => {
    const cacheKey = getPageCacheKey(category, page);
    const cachedArticles = pageCacheRef.current[cacheKey];

    if (cachedArticles) {
      return cachedArticles;
    }

    try {
      const nextArticles = await fetchIndexedPage(category, page);
      pageCacheRef.current[cacheKey] = nextArticles;
      return nextArticles;
    } catch (error) {
      if (category === 'All Posts' || !isMissingIndexError(error)) {
        throw error;
      }

      const fallbackArticles = await fetchCategoryPageFallback(category, page);
      pageCacheRef.current[cacheKey] = fallbackArticles;
      return fallbackArticles;
    }
  }, [fetchCategoryPageFallback, fetchIndexedPage]);

  const fetchTotalPages = useCallback(async (category: string) => {
    const cachedTotalPages = totalPagesCacheRef.current[category];

    if (cachedTotalPages) {
      return cachedTotalPages;
    }

    const countQuery = category === 'All Posts'
      ? query(collection(db, 'news'))
      : query(collection(db, 'news'), where('category', '==', category));
    const countSnapshot = await getCountFromServer(countQuery);
    const nextTotalPages = Math.max(1, Math.ceil(countSnapshot.data().count / PAGE_SIZE));
    totalPagesCacheRef.current[category] = nextTotalPages;

    return nextTotalPages;
  }, []);

  const handleCategoryChange = (category: string) => {
    pageCursorsRef.current = {
      ...pageCursorsRef.current,
      [category]: { 1: null }
    };
    setActiveCategory(category);
    setCurrentPage(1);
    setTotalPages(totalPagesCacheRef.current[category] ?? 1);
  };

  useEffect(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    const cacheKey = getPageCacheKey(activeCategory, currentPage);
    const cachedArticles = pageCacheRef.current[cacheKey];

    if (cachedArticles) {
      setArticles(cachedArticles);
      setLoading(false);
    } else {
      setLoading(true);
    }

    void fetchArticlesPage(activeCategory, currentPage)
      .then((nextArticles) => {
        if (requestIdRef.current !== requestId) return;
        setArticles(nextArticles);
      })
      .catch((error) => {
        if (requestIdRef.current !== requestId) return;
        console.error("Error fetching articles:", error);
        setArticles([]);
      })
      .finally(() => {
        if (requestIdRef.current !== requestId) return;
        setLoading(false);
      });

    const cachedTotalPages = totalPagesCacheRef.current[activeCategory];

    if (cachedTotalPages) {
      setTotalPages(cachedTotalPages);
      setCountLoading(false);
      return;
    }

    setCountLoading(true);
    void fetchTotalPages(activeCategory)
      .then((nextTotalPages) => {
        if (requestIdRef.current !== requestId) return;
        setTotalPages(nextTotalPages);
        setCurrentPage(page => Math.min(page, nextTotalPages));
      })
      .catch((error) => {
        if (requestIdRef.current !== requestId) return;
        console.error("Error fetching article count:", error);
        setTotalPages(1);
      })
      .finally(() => {
        if (requestIdRef.current !== requestId) return;
        setCountLoading(false);
      });
  }, [activeCategory, currentPage, fetchArticlesPage, fetchTotalPages]);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('news.title')}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              {t('news.description')}
            </p>
          </div>

          {isAdmin && (
            <Link
              to="/admin/news/new"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {t('news.write_new')}
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-100 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {t(categoryKeys[category])}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  id={article.id}
                  title={article.title ?? ''}
                  excerpt={article.excerpt ?? ''}
                  imageUrl={article.imageUrl ?? ''}
                  category={article.category ?? ''}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-12" aria-label="News pagination">
                <button
                  type="button"
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1 || loading || countLoading}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {paginationItems.map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      disabled={loading || countLoading}
                      className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                        currentPage === page
                          ? 'bg-primary text-white shadow-md'
                          : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                      }`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ) : (
                    <span
                      key={`${page}-${index}`}
                      className="inline-flex h-10 min-w-8 items-center justify-center text-sm font-semibold text-gray-400"
                    >
                      {page}
                    </span>
                  )
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages || loading || countLoading}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <p className="text-gray-500 text-lg">{t('news.no_articles')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
