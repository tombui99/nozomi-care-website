import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const navItems = [
    { label: t("navigation.about"), href: "#about" },
    { label: t("navigation.services"), href: "#services" },
    { label: t("navigation.philosophy"), href: "#philosophy" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl inline-block">
                <img
                  src="/logo.png"
                  alt="Nozomi Care Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/60 leading-relaxed font-medium">
              {t("brand.description")}
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <Icon
                    size={18}
                    className="text-white/60 group-hover:text-white"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">{t("footer.links_title")}</h4>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/60 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">{t("footer.contact_title")}</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {t("footer.contact.address")}
                </span>
              </div>
              <div className="flex gap-4">
                <Phone className="text-primary shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {t("footer.contact.phone")}
                </span>
              </div>
              <div className="flex gap-4">
                <Mail className="text-primary shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {t("footer.contact.email")}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">
              {t("footer.newsletter_title")}
            </h4>
            <p className="text-white/60 font-medium">
              {t("footer.newsletter_desc")}
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder={t("footer.newsletter_placeholder")}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-primary transition-colors text-white"
              />
              <button className="w-full py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all">
                {t("footer.newsletter_button")}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-medium">
            {t("footer.copyright", {
              year: new Date().getFullYear(),
              brand: t("brand.name"),
            })}
          </p>
          <div className="flex gap-8 text-sm text-white/40 font-medium">
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
