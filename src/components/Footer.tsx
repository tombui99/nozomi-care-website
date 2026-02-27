import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import content from "../data/content.json";

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl inline-block">
                <img
                  src="/logo.png"
                  alt="Nozomi Care Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/60 leading-relaxed font-medium">
              {content.brand.description}
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <Icon
                    size={18}
                    className="text-white/60 group-hover:text-white"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Liên kết</h4>
            <nav className="flex flex-col gap-4">
              {content.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/60 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Thông tin Liên hệ</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <MapPin className="text-primary flex-shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {content.contact.address}
                </span>
              </div>
              <div className="flex gap-4">
                <Phone className="text-primary flex-shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {content.contact.phone}
                </span>
              </div>
              <div className="flex gap-4">
                <Mail className="text-primary flex-shrink-0" size={20} />
                <span className="text-white/60 font-medium">
                  {content.contact.email}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Nhận thông tin</h4>
            <p className="text-white/60 font-medium">
              Đăng ký để nhận những cập nhật mới nhất từ Nozomi Care.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-primary transition-colors text-white"
              />
              <button className="w-full py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-medium">
            © {new Date().getFullYear()} {content.brand.name}. Tất cả các quyền
            được bảo lưu.
          </p>
          <div className="flex gap-8 text-sm text-white/40 font-medium">
            <a href="#" className="hover:text-white transition-colors">
              Chính sách Bảo mật
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Điều khoản Dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
