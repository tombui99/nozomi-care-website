import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Activity,
  Brain,
  Heart,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";
import { ContactButton } from "./ContactButton";

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: "rehab",
      title: t("solutions.items.rehab.title"),
      description: t("solutions.items.rehab.description"),
      icon: <Activity size={32} />,
      color: "primary", // Pink
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/20",
      hoverShadow: "hover:shadow-primary/20",
      bullets: [],
    },
    {
      id: "dementia",
      title: t("solutions.items.dementia.title"),
      icon: <Brain size={32} />,
      color: "brand-yellow",
      bgColor: "bg-brand-yellow/10",
      textColor: "text-brand-yellow-dark",
      borderColor: "border-brand-yellow/20",
      hoverShadow: "hover:shadow-brand-yellow/20",
      bullets: t("solutions.items.dementia.bullets", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "palliative",
      title: t("solutions.items.palliative.title"),
      icon: <Heart size={32} />,
      color: "brand-green",
      bgColor: "bg-brand-green/10",
      textColor: "text-brand-green",
      borderColor: "border-brand-green/20",
      hoverShadow: "hover:shadow-brand-green/20",
      bullets: t("solutions.items.palliative.bullets", {
        returnObjects: true,
      }) as string[],
    },
  ];

  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Sparkles size={16} />
              {t("services.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-brand-dark mb-8 leading-tight">
              {t("solutions.title")}
            </h1>
            <p className="text-xl text-brand-dark/70 font-medium leading-relaxed max-w-2xl">
              {t("solutions.subtitle")}
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

      {/* Services Grid */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={cn(
                  "relative p-8 md:p-10 rounded-bento bg-white border-2 flex flex-col h-full transition-all group",
                  service.borderColor,
                  service.hoverShadow,
                  "hover:scale-[1.02] shadow-xl shadow-gray-100",
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform",
                    service.bgColor,
                    service.textColor,
                  )}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6 leading-tight">
                  {service.title}
                </h3>

                {service.description ? (
                  <p className="text-brand-dark/70 font-medium leading-relaxed mb-8 grow">
                    {service.description}
                  </p>
                ) : (
                  <div className="space-y-4 mb-8 grow">
                    {service.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-3">
                        <CheckCircle2
                          size={20}
                          className={cn("mt-1 shrink-0", service.textColor)}
                        />
                        <p className="text-brand-dark/70 font-medium leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-dark rounded-[48px] p-12 md:p-20 text-center relative"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                {t("footer.newsletter_title")}
              </h2>
              <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto">
                {t("footer.newsletter_desc")}
              </p>
              <ContactButton variant="footer" />
            </div>

            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
