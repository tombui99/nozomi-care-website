import React from "react";
import { motion } from "framer-motion";
import content from "../data/content.json";
import { Phone, ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative px-6 py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary self-start font-semibold text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            40 năm kinh nghiệm từ Nhật Bản
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-brand-dark leading-[1.1]">
            {content.hero.title.split(" ").map((word, i) => (
              <span key={i} className={i > 2 ? "text-primary" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="text-xl text-brand-dark/70 max-w-lg leading-relaxed">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
              {content.hero.cta}
              <ArrowRight size={20} />
            </button>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-primary/10 bg-white shadow-sm">
              <div className="p-3 bg-secondary/20 rounded-xl">
                <Phone className="text-primary" size={32} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold">
                  Tư vấn
                </span>
                <span className="text-sm font-bold text-brand-dark">
                  {content.hero.qrLabel}
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
                <span className="text-3xl font-bold text-primary">40 năm</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-dark/60 font-bold">
                  Kinh nghiệm chăm sóc
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
