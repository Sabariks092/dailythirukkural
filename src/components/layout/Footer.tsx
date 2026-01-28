import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-surface border-t-2 border-primary-500 pt-12 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-500 flex items-center justify-center text-white text-2xl">
                📖
              </div>
              <h2 className="tamil-text text-2xl font-bold text-primary-500 leading-tight">
                தினசரி திருக்குறள்
              </h2>
            </div>
            <p className="tamil-text text-text-secondary text-sm leading-relaxed mb-4">
              திருக்குறள் என்பது காலத்தால் அழியாத ஒரு காவியம். அது மனித
              சமுதாயத்திற்குத் தமிழினம் வழங்கிய மாபெரும் கொடை.
            </p>
            <div className="text-xs text-text-secondary uppercase tracking-widest font-bold">
              ESTD. 2026 • Universal Ethics
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-secondary-500 pl-3">
              பயனுள்ள இணைப்புகள்
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="tamil-text text-text-secondary hover:text-primary-500 transition-colors"
                >
                  எமது நோக்கம் மற்றும் தொலைநோக்கு
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="tamil-text text-text-secondary hover:text-primary-500 transition-colors"
                >
                  திருவள்ளுவர் வரலாறு
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="tamil-text text-text-secondary hover:text-primary-500 transition-colors"
                >
                  உதவி மற்றும் தொடர்பு
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Quote */}
          <div>
            <h3 className="text-text-primary font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-accent-500 pl-3">
              சமூக வலைதளத் தொடர்புகள்
            </h3>
            <div className="bg-bg-main p-6 border-l-2 border-primary-500">
              <p className="tamil-text italic text-text-secondary text-sm mb-4">
                "எப்பொருள் யார்யார்வாய்க் கேட்பினும் அப்பொருள்
                <br />
                மெய்ப்பொருள் காண்ப தறிவு."
              </p>
              <p className="text-xs text-text-primary font-bold">— குறள் 423</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-soft pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-text-secondary font-medium">
            © 2026 தினசரி திருக்குறள் அமைப்பு. அனைத்து உரிமைகளும் தமிழ்ச்
            சமூகத்தால் பாதுகாக்கப்பட்டவை.
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-text-secondary hover:text-primary-500 font-bold uppercase tracking-widest"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-xs text-text-secondary hover:text-primary-500 font-bold uppercase tracking-widest"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs text-text-secondary hover:text-primary-500 font-bold uppercase tracking-widest"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
