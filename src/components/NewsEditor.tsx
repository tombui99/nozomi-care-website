import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../lib/auth';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Youtube, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const categories = [
  'Tin tức và Sự kiện',
  'Cẩm nang sức khoẻ',
  'Khuyến mãi'
];

export const NewsEditor: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0],
    imageUrl: '',
    content: '',
    youtubeUrl: ''
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/news');
      return;
    }

    const fetchArticle = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'news', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              title: data.title || '',
              category: data.category || categories[0],
              imageUrl: data.imageUrl || '',
              content: data.content || '',
              youtubeUrl: data.youtubeUrl || ''
            });
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [id, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      // Create a temporary element to extract plain text and decode entities
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formData.content;
      
      // Replace block tags with space to avoid merging words
      const blocks = tempDiv.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote');
      blocks.forEach(block => {
        block.insertAdjacentText('afterend', ' ');
      });

      const plainText = (tempDiv.textContent || tempDiv.innerText || "").replace(/\u00a0/g, ' ').trim();
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      
      const articleData = {
        ...formData,
        excerpt,
        updatedAt: serverTimestamp(),
      };

      if (id) {
        await updateDoc(doc(db, 'news', id), articleData);
      } else {
        await addDoc(collection(db, 'news'), {
          ...articleData,
          author: user.displayName || 'Anonymous',
          authorEmail: user.email,
          authorPhoto: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }
      navigate('/news');
    } catch (error) {
      console.error("Error saving article:", error);
      alert(t('news.actions.error_saving') || "Error saving article.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('news.back')}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {id ? t('news.edit') : t('news.write_new')}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('news.labels.title')}</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder={t('news.labels.placeholder_title')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('news.labels.category')}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('news.labels.image')}</label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder={t('news.labels.placeholder_image')}
                    />
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('news.labels.youtube')}</label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder={t('news.labels.placeholder_youtube')}
                  />
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="quill-editor-container">
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('news.labels.content')}</label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder={t('news.labels.placeholder_content')}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'blockquote', 'code-block'],
                      ['clean']
                    ],
                  }}
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:scale-100"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {saving ? t('news.actions.saving') : (id ? t('news.actions.update') : t('news.actions.publish'))}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
