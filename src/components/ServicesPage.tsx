import { getCarePackages } from "../carePackages";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ContactButton } from "./ContactButton";

type ServiceSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  accent: string;
};

const supportSections: ServiceSection[] = [
  {
    id: "expert",
    eyebrow: "Chuyên gia Nhật Bản",
    title: "Giám sát trực tiếp bởi đội ngũ chuyên gia giàu kinh nghiệm",
    description:
      "Bà Yoko Amari - Chủ tịch Nozomi Care Việt Nam và TS. BS Tsuyoshi Mori - Cố vấn chuyên môn trực tiếp đồng hành cùng đội ngũ chăm sóc, đảm bảo phương pháp, quy trình và chất lượng vận hành theo tiêu chuẩn Nozomi.",
    bullets: [
      "Bà Yoko Amari có hơn 20 năm kinh nghiệm trong lĩnh vực chăm sóc và hỗ trợ người cao tuổi.",
      "TS. BS Tsuyoshi Mori trực tiếp tư vấn chuyên môn và giám sát chất lượng chăm sóc.",
      "Nozomi hợp tác, trao đổi chuyên môn với các bệnh viện và đơn vị liên quan tại Việt Nam.",
    ],
    image: "/services/pdf/expert-collab.png",
    imageAlt: "Lễ ký kết hợp tác chiến lược giữa Tubsense và Nozomi Group",
    accent: "from-primary/15 to-secondary/20",
  },
  {
    id: "training",
    eyebrow: "Đào tạo chuyển giao",
    title:
      "Đội ngũ nhân viên Việt Nam được đào tạo bài bản theo quy chuẩn khắt khe của Nhật Bản",
    description:
      "Chương trình đào tạo theo Nozomi Method tập trung vào kỹ thuật chăm sóc, phục hồi vận động và hỗ trợ người cao tuổi duy trì khả năng tự lập trong cuộc sống hằng ngày.",
    bullets: [
      "Chuyên gia Nhật Bản trực tiếp giảng dạy, giám sát và đánh giá năng lực.",
      "Phương pháp chăm sóc được chuẩn hóa để đội ngũ nắm vững kỹ thuật cốt lõi.",
      "Nozomi còn tổ chức các khóa đào tạo cơ bản cho gia đình và cộng đồng.",
    ],
    image: "/services/pdf/training-team.jpg",
    imageAlt: "Không gian đào tạo và vận động tại Nozomi Care Việt Nam",
    reverse: true,
    accent: "from-brand-yellow/20 to-white",
  },

];

const ServicesPage: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const packages = getCarePackages(t, i18n.resolvedLanguage);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    const legacyAnchors: Record<string, string> = {
      rehab: "care-exercise-trial",
      dementia: "long-term-care",
      palliative: "long-term-care",
    };
    const element = document.getElementById(legacyAnchors[hash] ?? hash);
    if (!element) return;

    const timer = window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-brand-light">
      <section
        id="self-reliance"
        className="relative px-6 py-20 md:py-24 scroll-mt-28 md:scroll-mt-36"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,142,170,0.16),_transparent_35%),radial-gradient(circle_at_left,_rgba(75,132,18,0.12),_transparent_30%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-primary text-sm font-bold mb-6 shadow-sm ring-1 ring-primary/10 backdrop-blur">
              <Sparkles size={16} />
              {t("carePackages.eyebrow")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark leading-tight mb-6">
              {t("carePackages.title")}
            </h1>
            <p className="text-lg md:text-xl text-brand-dark/75 leading-relaxed max-w-2xl mb-8">
              {t("carePackages.intro")}
            </p>
            <nav className="flex flex-wrap gap-3" aria-label={t("carePackages.eyebrow")}>
              {packages.map((item) => (
                <Link key={item.id} to={`/services#${item.id}`} className="rounded-full border border-primary/30 bg-white px-5 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-brand-green">
                  {item.title}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24" aria-label={t("carePackages.eyebrow")}>
        <div className="mx-auto max-w-7xl space-y-10">
          {packages.map((item, index) => (
            <article id={item.id} key={item.id} className="scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-gray-100 md:p-10">
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
                <div className="lg:sticky lg:top-28">
                  <img src={item.image.url} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" className="aspect-[4/3] w-full rounded-[1.75rem] object-cover" />
                  <span className="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-brand-green">0{index + 1} / {t("carePackages.eyebrow")}</span>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-dark md:text-4xl">{item.title}</h2>
                  <p className="mt-4 text-lg font-semibold leading-relaxed text-brand-dark/80">{item.tagline}</p>
                </div>
                <div className="min-w-0 text-brand-dark/80">
                  <p className="text-base leading-relaxed md:text-lg">{item.description}</p>
                  {item.movement.length > 0 && (
                    <div className="mt-7 space-y-4 rounded-3xl bg-brand-light p-5 md:p-6">
                      <h3 className="text-xl font-bold text-brand-dark">{t("carePackages.movementLabel")}</h3>
                      {item.movement.map((paragraph) => <p key={paragraph} className="leading-relaxed">{paragraph}</p>)}
                    </div>
                  )}
                  <h3 className="mb-4 mt-7 text-xl font-bold text-brand-dark">{t("carePackages.audienceLabel")}</h3>
                  <ul className="space-y-3">
                    {item.audience.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed"><CheckCircle2 size={20} className="mt-1 shrink-0 text-brand-green" aria-hidden="true" /><span>{point}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <h2 className="mx-auto mb-10 max-w-7xl text-3xl font-bold text-brand-dark md:text-4xl">{t("carePackages.supportTitle")}</h2>
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {supportSections.map((section) => (
            <motion.article
              id={section.id}
              key={section.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
              className={`scroll-mt-28 md:scroll-mt-36 grid gap-8 md:gap-10 items-center rounded-[2rem] p-5 md:p-8 bg-white shadow-xl ring-1 ring-gray-100 lg:grid-cols-2 ${section.reverse ? "lg:grid-flow-col-dense" : ""}`}
            >
              <div
                className={`relative ${section.reverse ? "lg:order-2" : ""}`}
              >
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-brand-green/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                className={`relative ${section.reverse ? "lg:order-1" : ""}`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light text-primary text-sm font-semibold mb-5">
                  <CheckCircle2 className="w-4 h-4" />
                  {section.eyebrow}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-brand-dark leading-tight mb-5">
                  {section.title}
                </h3>
                <p className="text-brand-dark/75 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                  {section.description}
                </p>

                <div className="space-y-4">
                  {section.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3">
                      <CheckCircle2 className="mt-1 w-5 h-5 shrink-0 text-primary" />
                      <p className="text-brand-dark/75 leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-brand-dark px-8 py-12 md:px-16 md:py-20 text-center shadow-2xl"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                {t("carePackages.consultTitle")}
              </h2>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10">
                {t("carePackages.consultText")}
              </p>
              <div className="flex justify-center">
                <ContactButton variant="footer" />
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
