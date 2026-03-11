import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com',
    color: 'bg-[#1877F2]',
    translationKey: 'social.facebook'
  },
  {
    name: 'Zalo',
    type: 'image',
    src: '/zalo.svg',
    href: 'https://zalo.me',
    color: 'bg-white',
    translationKey: 'social.zalo'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com',
    color: 'bg-[#0077B5]',
    translationKey: 'social.linkedin'
  }
];

export const SocialSidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`${social.color} p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group relative w-12 h-12 overflow-hidden`}
          title={t(social.translationKey)}
        >
          {social.type === 'image' ? (
            <img 
              src={social.src} 
              alt={social.name} 
              className="w-full h-full object-contain p-1"
            />
          ) : social.icon ? (
            <social.icon size={24} className="text-white" strokeWidth={2} />
          ) : null}
          <span className="absolute right-full mr-3 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {t(social.translationKey)}
          </span>
        </motion.a>
      ))}
    </div>
  );
};
