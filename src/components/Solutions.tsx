import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import content from "../data/content.json";

export const Solutions: React.FC = () => {
  const { solutions } = content;

  return (
    <section id="solutions" className="bg-white">
      <div className="max-w-full">
        <div className="text-center py-20 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            {solutions.title}
          </h2>
          <p className="text-xl text-brand-dark/60">{solutions.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 w-full">
          {solutions.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="flex flex-col group h-full"
            >
              {/* Image Section */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Content Section */}
              <div
                className={cn(
                  "flex-1 p-12 text-white min-h-[400px] flex flex-col justify-center",
                  item.color.startsWith("bg-")
                    ? item.color
                    : `bg-gradient-to-br ${item.color}`,
                )}
              >
                <h3 className="text-2xl font-bold mb-6 leading-tight">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-lg leading-relaxed opacity-90 mb-8">
                    {item.description}
                  </p>
                )}

                {item.bullets && (
                  <ul className="space-y-4">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-lg opacity-90">
                        <Check className="shrink-0 mt-1" size={24} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
