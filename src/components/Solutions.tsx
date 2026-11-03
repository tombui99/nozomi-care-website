import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCarePackages } from "../carePackages";

export const Solutions = () => {
  const { t, i18n } = useTranslation();
  const packages = getCarePackages(t, i18n.resolvedLanguage);

  return (
    <section id="solutions" className="bg-white">
      <div className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t("solutions.title")}</h2>
        <p className="text-xl text-brand-dark/60">{t("solutions.subtitle")}</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4">
        {packages.map((item, index) => (
          <Link key={item.id} to={`/services#${item.id}`} className="group block h-full focus-visible:outline-4 focus-visible:outline-brand-dark focus-visible:-outline-offset-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} className="flex flex-col h-full">
              <div className="h-72 overflow-hidden">
                <img src={item.image.url} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className={`flex flex-1 flex-col p-7 md:p-8 ${item.color} ${item.key === "experience" ? "text-brand-dark" : "text-white"}`}>
                <h3 className="text-2xl font-bold mb-4 leading-tight">{item.title}</h3>
                <p className="font-semibold leading-relaxed mb-4">{item.tagline}</p>
                <p className="leading-relaxed mb-7 opacity-90">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-bold text-sm">{t("carePackages.detailsLabel")}<ArrowRight size={18} aria-hidden="true" /></span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};
