import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { NewsCard } from './NewsCard';
import { Plus } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';

const categories = [
  'All Posts',
  'Tin tức và Sự kiện',
  'Cẩm nang sức khoẻ',
  'Khuyến mãi'
];

export const NewsPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<any[]>([]); // any[] for Firestore documents
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Posts');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Fetch all articles and filter client-side for better UX and to avoid composite index requirements
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const allData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (activeCategory === 'All Posts') {
          setArticles(allData);
        } else {
          setArticles(allData.filter((article: any) => article.category === activeCategory));
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]); // Clear articles on error
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tin tức & Sự kiện
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Cập nhật những tin tức mới nhất, kiến thức y khoa và các chương trình ưu đãi từ Nozomi.
            </p>
          </div>
          
          {isAdmin && (
            <Link 
              to="/admin/news/new"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Viết bài mới
            </Link>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-100 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <p className="text-gray-500 text-lg">Chưa có bài viết nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};
