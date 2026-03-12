import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const navItems = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.about"), href: "/about" },
    { label: t("navigation.services"), href: "/services" },
    { label: t("navigation.news"), href: "/#news" },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
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
              <a
                href="https://facebook.com/nozomicare"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all group"
              >
                <Facebook
                  size={18}
                  className="text-white/60 group-hover:text-white"
                />
              </a>
              <a
                href="tel:0904533858"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-green hover:border-brand-green transition-all group"
              >
                <Phone
                  size={18}
                  className="text-white/60 group-hover:text-white"
                />
              </a>
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
                  Số TT02-1 và TT02-2, KĐT mới Phú Lương, Phường Kiến Hưng, TP.
                  Hà Nội.
                </span>
              </div>
              <div className="flex gap-4">
                <Phone className="text-primary shrink-0" size={20} />
                <span className="text-white/60 font-medium">090 453 38 58</span>
              </div>
              <div className="flex gap-4">
                <Mail className="text-primary shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {t("footer.contact.email")}
                </span>
              </div>
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
