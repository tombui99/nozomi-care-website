import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Edit, Trash2, Share2 } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useTranslation } from 'react-i18next';

export const NewsDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [article, setArticle] = useState<any>(null); // any used for Firestore document data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such article!");
          navigate('/news');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id || !window.confirm(t('news.delete_confirm'))) return;
    try {
      await deleteDoc(doc(db, 'news', id));
      navigate('/news');
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article.");
    }
  };

  const formattedDate = article?.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/news" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('news.back')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary font-bold overflow-hidden">
                   {article.authorPhoto ? <img src={article.authorPhoto} alt={article.author} className="w-full h-full object-cover" /> : article.author?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{article.author}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </span>
                    <span className="text-xs text-gray-400">• {t('news.posted_by')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isAdmin && (
                  <>
                    <Link 
                      to={`/admin/news/edit/${article.id}`}
                      className="p-2 text-gray-400 hover:text-primary transition-colors border border-gray-100 rounded-lg"
                      title={t('news.edit')}
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button 
                      onClick={handleDelete}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors border border-gray-100 rounded-lg"
                      title={t('news.delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-primary transition-colors border border-gray-100 rounded-lg">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('news.share')}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
            {article.content?.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>

          {article.youtubeUrl && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('news.labels.youtube')}</h3>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(article.youtubeUrl) || ''}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
