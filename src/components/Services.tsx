import React from "react";
import { motion } from "framer-motion";
import { Heart, UserCheck, GraduationCap, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import content from "../data/content.json";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart size={32} />,
  UserCheck: <UserCheck size={32} />,
  GraduationCap: <GraduationCap size={32} />,
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="px-6 py-24 bg-brand-light/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
        >
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Sparkles size={16} /> Dịch vụ tiêu chuẩn Nhật Bản
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
              Năng lực Vượt trội từ tinh hoa 40 năm kinh nghiệm
            </h2>
          </div>
          <p className="text-brand-dark/60 max-w-sm font-medium leading-relaxed">
            Kỹ thuật cao từ Nhật Bản, đào tạo chuyển giao cho người Việt, giám
            sát bởi chuyên gia người Nhật.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {content.services.map((service, index) => {
            const themes = [
              {
                border: "border-primary/10",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
                shadow: "shadow-primary/5",
                hoverShadow: "hover:shadow-primary/20",
              },
              {
                border: "border-brand-green/10",
                iconBg: "bg-brand-green/10",
                iconColor: "text-brand-green",
                shadow: "shadow-brand-green/5",
                hoverShadow: "hover:shadow-brand-green/20",
              },
              {
                border: "border-brand-yellow/10",
                iconBg: "bg-brand-yellow/10",
                iconColor: "text-brand-yellow",
                shadow: "shadow-brand-yellow/5",
                hoverShadow: "hover:shadow-brand-yellow/20",
              },
            ];
            const theme = themes[index % themes.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -8 }}
                className={cn(
                  "p-10 rounded-4xl bg-white border shadow-xl transition-all group",
                  theme.border,
                  theme.shadow,
                  theme.hoverShadow,
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform",
                    theme.iconBg,
                    theme.iconColor,
                  )}
                >
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  {service.title}
                </h3>
                <p className="text-brand-dark/70 leading-relaxed font-medium">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Section (Bento Box inside) */}
        <div
          id="philosophy"
          className="p-8 md:p-16 rounded-[48px] bg-brand-dark text-white overflow-hidden relative"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="flex flex-col gap-8">
              <span className="px-5 py-2 rounded-full bg-white/10 text-secondary self-start font-bold text-sm tracking-wider uppercase">
                Triết lý chăm sóc
              </span>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Triết lý <span className="text-primary">HOPE</span>
              </h2>
              <p className="text-2xl text-white/80 font-medium max-w-md">
                {content.philosophy.description}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {content.philosophy.points.map((point) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                    {point.id}
                  </div>
                  <p className="text-lg text-white/90 font-medium leading-relaxed">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
