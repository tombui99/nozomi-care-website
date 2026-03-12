import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ContactButton } from "./ContactButton";
import { useAuth } from "../lib/auth";

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, login, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.about"), href: "/about" },
    { label: t("navigation.services"), href: "/services" },
    { label: "Tin tức", href: "/news" },
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

          {/* User Auth */}
          <div className="relative">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary hover:scale-105 transition-transform"
                >
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-full h-full object-cover" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-2">
                       <UserIcon size={16} className="text-gray-400" />
                       <span className="text-xs font-semibold text-gray-700 truncate">{user.displayName}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={login}
                className="flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-primary transition-colors"
              >
                <LogIn size={18} />
                Đăng nhập
              </button>
            )}
          </div>

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
          <ContactButton variant="header" />
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
                location.pathname === item.href
                  ? "text-primary"
                  : "text-brand-dark",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-10 h-10 rounded-full" />
                  <span className="font-bold text-brand-dark">{user.displayName}</span>
                </div>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-red-600 font-semibold"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { login(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 font-semibold text-brand-dark"
              >
                <LogIn size={18} />
                Đăng nhập
              </button>
            )}
          </div>

          <ContactButton
            variant="header"
            className="w-full py-4 justify-center"
          />
        </motion.div>
      )}
    </header>
  );
};
