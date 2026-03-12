import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Phone, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";

interface ContactButtonProps {
  className?: string;
  variant?: "header" | "hero" | "footer";
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className,
  variant = "header",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contactOptions = [
    {
      label: "Facebook",
      icon: <Facebook size={18} />,
      href: "https://facebook.com/nozomicare",
      color: "text-[#1877F2]",
      bgColor: "bg-[#1877F2]/10",
    },
    {
      label: "090 453 38 58",
      icon: <Phone size={18} />,
      href: "tel:0904533858",
      color: "text-brand-green",
      bgColor: "bg-brand-green/10",
    },
  ];

  const baseStyles = {
    header:
      "px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2",
    hero: "px-10 py-5 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 flex items-center gap-2",
    footer:
      "px-12 py-5 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 flex items-center gap-2",
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(baseStyles[variant], className)}
      >
        {t("common.contact_cta")}
        <ChevronDown
          size={variant === "header" ? 16 : 20}
          className={cn("transition-transform", isOpen ? "rotate-180" : "")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 mt-3 w-64 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 p-2 rounded-3xl overflow-hidden",
              variant === "header" ? "right-0" : "left-1/2 -translate-x-1/2"
            )}
          >
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                target={option.label === "Facebook" ? "_blank" : undefined}
                rel={option.label === "Facebook" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                    option.bgColor,
                    option.color
                  )}
                >
                  {option.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold">
                    {option.label === "Facebook" ? t("social.facebook") : t("footer.contact_title")}
                  </span>
                  <span className="text-sm font-bold text-brand-dark">
                    {option.label}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
