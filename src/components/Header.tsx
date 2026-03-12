import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("navigation.about"), href: "/about" },
    { label: t("navigation.services"), href: "/#services" },
    { label: t("navigation.news"), href: "/#news" },
    { label: t("navigation.contact"), href: "/#contact" },
  ];

  const currentLanguage =
    languages.find(
      (l) => l.code === (i18n.resolvedLanguage || i18n.language),
    ) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 bg-white",
        isScrolled ? "shadow-sm py-3" : "py-5",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Nozomi Care Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-brand-dark/80 hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary transition-colors text-sm font-medium text-brand-dark"
            >
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.code.toUpperCase()}</span>
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  isLangOpen ? "rotate-180" : "",
                )}
              />
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors",
                      i18n.language === lang.code
                        ? "text-primary font-bold bg-primary/5"
                        : "text-brand-dark",
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
            {t("common.contact_cta")}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-gray-200 text-xs font-bold"
          >
            <span>{currentLanguage.flag}</span>
            <span>{currentLanguage.code.toUpperCase()}</span>
          </button>
          <button
            className="p-2 text-brand-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Language Popup (Mobile) */}
      {isLangOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end"
          onClick={() => setIsLangOpen(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="w-full bg-white rounded-t-4xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
            <div className="flex flex-col gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                    i18n.language === lang.code
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-100 bg-gray-50 text-brand-dark",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-bold">{lang.label}</span>
                  </div>
                  {i18n.language === lang.code && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-lg font-medium",
                location.pathname === item.href ? "text-primary" : "text-brand-dark",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl">
            {t("common.contact_cta")}
          </button>
        </motion.div>
      )}
    </header>
  );
};
