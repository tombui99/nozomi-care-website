import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: any;
  imageUrl: string;
  category: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  excerpt,
  author,
  date,
  imageUrl,
  category,
}) => {
  const { t } = useTranslation();
  const formattedDate = date?.toDate
    ? date.toDate().toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : date;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
    >
      <Link to={`/news/${id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1516549291061-2628da6e8a4a?auto=format&fit=crop&q=80"
            }
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            {category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt
              .replace(/<[^>]*>/g, " ") // Replace tags with space to avoid merging
              .replace(/&nbsp;/g, " ")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\s+/g, " ") // Collapse multiple spaces
              .trim()}
          </p>

          <div className="flex items-center text-primary font-semibold gap-2">
            {t("news.read_more")} <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
