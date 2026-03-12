import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { ContactButton } from "./ContactButton";

export const AboutNozomi = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const visionItems = ["1", "2", "3"];

  return (
    <div ref={containerRef} className="bg-white text-brand-dark overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-32 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Sparkles size={16} />
              {t("navigation.about")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-brand-dark mb-8 leading-tight">
              {t("brand.tagline")}
            </h1>
            <p className="text-xl text-brand-dark/70 font-medium leading-relaxed max-w-2xl">
              {t("brand.description")}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </section>

      {/* Section 01: Pioneering Unit */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
              >
                <span className="text-zinc-300 font-mono text-lg mb-4 block">01</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-8">
                  {t("about_nozomi.pioneering.title")}
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
              </motion.div>
            </div>

            <div className="lg:w-2/3 space-y-20">
              {["1", "2", "3", "4", "5"].map((key, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <h3 className="text-2xl font-bold text-primary mb-6 flex items-baseline gap-4">
                    <span className="text-zinc-200 font-mono text-xl group-hover:text-primary/30 transition-colors">
                      {key.padStart(2, '0')}
                    </span>
                    {t(`about_nozomi.pioneering.items.${key}.title`).replace(/^\d+\.\s*/, '')}
                  </h3>
                  <div className="pl-10 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-100 group-hover:bg-primary/20 transition-colors" />
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(t(`about_nozomi.pioneering.items.${key}.bullets`, {
                        returnObjects: true,
                      }) as string[] || []).map((bullet, idx) => (
                        <li key={idx} className="flex gap-4 text-brand-dark/70 text-base leading-relaxed">
                          <CheckCircle2 size={20} className="text-brand-green shrink-0 mt-1 opacity-60" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Vision */}
      <section className="py-32 bg-brand-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-zinc-300 font-mono text-lg mb-4 block text-right lg:text-left">02</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-12 text-right lg:text-left">
                  {t("about_nozomi.vision.title")}
                </h2>

                <div className="space-y-12">
                  {visionItems.map((key, index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-8"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-brand-green to-transparent rounded-full opacity-30" />
                      <h3 className="text-xl font-bold text-brand-green mb-3">
                        {t(`about_nozomi.vision.items.${key}.title`).replace(/^\d+\.\s*/, '')}
                      </h3>
                      <p className="text-brand-dark/70 text-lg font-light leading-relaxed">
                        {t(`about_nozomi.vision.items.${key}.description`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/hero.png"
                  alt="Vision"
                  className="w-full aspect-4/5 object-cover"
                />
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent lg:hidden" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-green/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA or Quote Section */}
      <section className="py-40 bg-brand-dark text-white text-center relative">
        <div className="max-w-4xl mx-auto px-6 relative">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
           >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 leading-tight">
               {t("hero.floating_label")}
            </h2>
            <ContactButton variant="footer" />
           </motion.div>
        </div>
      </section>
    </div>
  );
};
