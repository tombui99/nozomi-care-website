import { ArrowRight, HeartPulse, Phone, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPhoto } from "../photos";

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const photo = getPhoto("welcoming-space", i18n.resolvedLanguage);
  const values = [
    { Icon: HeartPulse, key: "care" },
    { Icon: ShieldCheck, key: "safety" },
    { Icon: UsersRound, key: "connection" },
  ];

  return (
    <section className="nozomi-hero" aria-labelledby="home-title">
      <img
        src={photo.url}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        fetchPriority="high"
        className="nozomi-hero-photo"
      />
      <div className="nozomi-hero-inner">
        <div className="nozomi-hero-content">
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-green">
            <Sparkles size={16} aria-hidden="true" /> {t("hero.badge")}
          </span>
          <h1 id="home-title">{t("hero.title")}</h1>
          <p className="nozomi-hero-description">{t("hero.subtitle")}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/services" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 font-bold text-brand-dark transition-colors hover:bg-secondary">
              {t("hero.cta")} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="tel:0924066688" className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-white/80 px-6 py-3.5 font-bold text-brand-dark transition-colors hover:bg-white">
              <Phone size={17} aria-hidden="true" /> {t("common.contact_cta")}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-brand-dark/80">
            {values.map(({ Icon, key }) => (
              <span key={key} className="inline-flex items-center gap-2">
                <Icon size={17} className="text-brand-green" aria-hidden="true" />
                {t(`hero.values.${key}`)}
              </span>
            ))}
          </div>
          <p className="mt-7 text-sm font-bold text-brand-dark">{t("brand.tagline")}</p>
        </div>
      </div>
    </section>
  );
};
