import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
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

const serviceSections: ServiceSection[] = [
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
  {
    id: "rehab",
    eyebrow: "Phục hồi chức năng",
    title:
      "Phục hồi chức năng chuyên biệt cho người sau đột quỵ, phẫu thuật hoặc suy giảm vận động",
    description:
      "Chương trình phục hồi tại Nozomi Care được xây dựng để hỗ trợ cải thiện khả năng đi lại, duy trì sự tự lập và nâng cao chất lượng sống, với hệ thống máy tập Polaris tiêu chuẩn Nhật Bản và huấn luyện viên cá nhân.",
    bullets: [
      "Luyện tập phục hồi vận động để cải thiện khả năng đi lại sau giai đoạn điều trị.",
      "Chế độ dinh dưỡng hỗ trợ phục hồi sức khỏe cơ bắp và thể trạng.",
      "Hỗ trợ sinh hoạt hằng ngày như đi lại, tắm rửa, vệ sinh cá nhân và các hoạt động ADL.",
      "Tư vấn và sử dụng thiết bị hỗ trợ phù hợp như khung tập đi hoặc dụng cụ vận động.",
    ],
    image: "/services/pdf/rehab-room.png",
    imageAlt: "Không gian phục hồi chức năng tại Nozomi Care Việt Nam",
    accent: "from-brand-green/15 to-white",
  },
  {
    id: "dementia",
    eyebrow: "Sa sút trí tuệ",
    title:
      "Không gian sống thân thuộc và an toàn cho người cao tuổi sa sút trí tuệ",
    description:
      "Môi trường sinh hoạt được thiết kế gần gũi, quen thuộc và có hệ thống an ninh - giám sát 24/7, nhằm giảm căng thẳng, hỗ trợ ổn định tinh thần và tạo cảm giác an tâm cho gia đình.",
    bullets: [
      "Nhân viên được đào tạo theo Nozomi Method để thấu hiểu tâm lý và hành vi của người cao tuổi.",
      "Không gian sinh hoạt gợi lại kỷ ức thân quen, giúp giảm căng thẳng và lo lắng.",
      "Hệ thống camera khu vực chung, nút gọi khẩn cấp và nhân viên trực 24/7 đảm bảo an toàn.",
      "Hoạt động sinh hoạt và vận động được thiết kế phù hợp với thể trạng từng người.",
    ],
    image: "/services/pdf/dementia-living.png",
    imageAlt: "Không gian chăm sóc người cao tuổi sa sút trí tuệ",
    reverse: true,
    accent: "from-secondary/20 to-white",
  },
  {
    id: "palliative",
    eyebrow: "Chăm sóc giảm nhẹ",
    title: "Hỗ trợ người cao tuổi ở giai đoạn cuối với sự thoải mái và bình an",
    description:
      "Nozomi Care xây dựng kế hoạch chăm sóc cá nhân hóa, theo dõi sức khỏe, hỗ trợ sinh hoạt và đồng hành cùng gia đình trong giai đoạn khó khăn, với mục tiêu giảm bớt đau đớn và duy trì sự bình an tinh thần.",
    bullets: [
      "Lập kế hoạch chăm sóc dựa trên tình trạng sức khỏe, nhu cầu và mong muốn cá nhân.",
      "Đội ngũ điều dưỡng hỗ trợ sinh hoạt hằng ngày và phối hợp với bác sĩ khi cần thiết.",
      "Trung tâm duy trì kết nối với bác sĩ và cơ sở y tế để theo dõi những thay đổi về sức khỏe.",
      "Chăm sóc tinh thần, lắng nghe và đồng hành cùng gia đình trong suốt giai đoạn cuối đời.",
    ],
    image: "/services/pdf/palliative-care.png",
    imageAlt: "Không gian chăm sóc giảm nhẹ tại Nozomi Care Việt Nam",
    accent: "from-brand-dark/10 to-white",
  },
];

const ServicesPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    const element = document.getElementById(hash);
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
              Dịch vụ chuyên biệt
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark leading-tight mb-6">
              Nozomi Care Việt Nam
            </h1>
            <p className="text-lg md:text-xl text-brand-dark/75 leading-relaxed max-w-2xl mb-8">
              Nozomi Care cung cấp dịch vụ chăm sóc dành cho người cao tuổi ở
              nhiều giai đoạn khác nhau, từ đào tạo chuyển giao, phục hồi chức
              năng chuyên biệt, chăm sóc người cao tuổi sa sút trí tuệ cho đến
              chăm sóc giảm nhẹ cuối đời.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {serviceSections.map((section) => (
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
                Cần tư vấn mô hình chăm sóc phù hợp?
              </h2>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10">
                Hãy liên hệ để được tư vấn dịch vụ phù hợp với tình trạng sức
                khỏe, nhu cầu chăm sóc và mục tiêu vận động của người thân.
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
