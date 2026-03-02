import React from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative px-6 py-12 md:py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green self-start font-semibold text-sm border border-brand-green/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-brand-dark leading-[1.1]">
            {t("hero.title")
              .split(" ")
              .map((word, i) => {
                const isPink =
                  word === "Tình" || word === "yêu" || word === "Love";
                const isGreen =
                  word === "Sự" ||
                  word === "Tự" ||
                  word === "lập" ||
                  word === "Self-reliance" ||
                  word === "愛" ||
                  word === "自立";
                return (
                  <span
                    key={i}
                    className={
                      isPink
                        ? "text-primary"
                        : isGreen
                          ? "text-brand-green"
                          : ""
                    }
                  >
                    {word}{" "}
                  </span>
                );
              })}
          </h1>

          <p className="text-xl text-brand-dark/70 max-w-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
              {t("hero.cta")}
              <ArrowRight size={20} />
            </button>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-primary/10 bg-white shadow-sm">
              <div className="p-3 bg-brand-yellow/20 rounded-xl">
                <Phone
                  className="text-brand-yellow-dark"
                  style={{ color: "#B49300" }}
                  size={32}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold">
                  {t("common.contact_cta")}
                </span>
                <span className="text-sm font-bold text-brand-dark">
                  {t("hero.qr_label")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-square md:aspect-auto md:h-150 flex items-center justify-center p-4"
        >
          <div className="relative w-full h-full rounded-[48px] overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/hero.png"
              alt="Nozomi Care Hero"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Floating Stats Card */}
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 z-20">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-primary">
                  40{" "}
                  {t("navigation.about").includes("About")
                    ? "years"
                    : t("navigation.about").includes("会社")
                      ? "年"
                      : "năm"}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-dark/60 font-bold">
                  {t("hero.stats_label")}
                </span>
              </div>
            </div>

            {/* Sub-label decoration matching branding */}
            <div className="absolute bottom-6 left-6 right-6 bg-brand-green/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-sm font-medium">{t("hero.floating_label")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
