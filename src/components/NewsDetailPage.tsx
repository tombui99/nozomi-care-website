import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Edit, Trash2, Share2, Facebook, Twitter, Link as LinkIcon, Check } from "lucide-react";
import { useAuth } from "../lib/auth";
import { useTranslation } from "react-i18next";

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt?: string;
  imageUrl: string;
  author: string;
  authorPhoto?: string;
  createdAt: any;
  youtubeUrl?: string;
}

export const NewsDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() } as NewsArticle);
        } else {
          console.error("No such article!");
          navigate("/news");
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
    if (!id || !window.confirm(t("news.delete_confirm"))) return;
    try {
      await deleteDoc(doc(db, "news", id));
      navigate("/news");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article.");
    }
  };

  const formattedDate = article?.createdAt?.toDate
    ? article.createdAt.toDate().toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const handleShare = async () => {
    if (!article) return;
    const shareData = {
      title: article.title,
      text: article.excerpt || article.content.substring(0, 100),
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setIsShareOpen(!isShareOpen);
    }
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
    setIsShareOpen(false);
  };

  const shareToTwitter = () => {
    if (!article) return;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`,
      "_blank"
    );
    setIsShareOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsShareOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
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
          {t("news.back")}
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
                  {article.authorPhoto ? (
                    <img
                      src={article.authorPhoto}
                      alt={article.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    article.author?.charAt(0)
                  )}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {article.author}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </span>
                    <span className="text-xs text-gray-400">
                      • {t("news.posted_by")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isAdmin && (
                  <>
                    <Link
                      to={`/admin/news/edit/${article.id}`}
                      className="p-2 text-gray-400 hover:text-primary transition-colors border border-gray-100 rounded-lg"
                      title={t("news.edit")}
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors border border-gray-100 rounded-lg"
                      title={t("news.delete")}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="relative">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-primary transition-colors border border-gray-100 rounded-lg bg-white"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{t("news.share")}</span>
                  </button>

                  {isShareOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <button
                        onClick={shareToFacebook}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
                      >
                        <Facebook size={18} className="text-[#1877F2]" />
                        Facebook
                      </button>
                      <button
                        onClick={shareToTwitter}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
                      >
                        <Twitter size={18} className="text-[#1DA1F2]" />
                        X (Twitter)
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
                      >
                        {copied ? (
                          <Check size={18} className="text-brand-green" />
                        ) : (
                          <LinkIcon size={18} className="text-gray-400" />
                        )}
                        {copied ? t("news.actions.copied") || "Copied!" : t("news.actions.copy_link") || "Copy Link"}
                      </button>
                    </motion.div>
                  )}
                  
                  {/* Backdrop for closing share menu */}
                  {isShareOpen && (
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsShareOpen(false)}
                    />
                  )}
                </div>
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
            {article.content
              ?.split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
          </div>

          {article.youtubeUrl && (
            <div className="mb-12">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(article.youtubeUrl) || ""}
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
