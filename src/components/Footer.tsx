import { motion } from 'motion/react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import Logo from '../imports/Logo';
import { useLanguage } from './LanguageContext';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/tap.solution/', label: 'Instagram', color: '#A84CB4' },
  { icon: Facebook, href: 'https://www.facebook.com/p/TAP-agency-61580078708606/', label: 'Facebook', color: '#51AE92' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/tap-solution-agency/posts/?feedView=all', label: 'LinkedIn', color: '#7F2C4C' },
];

const getServices = (t: (key: string) => string) => [
  { name: t('footer.services.brandIdentity'), href: '#' },
  { name: t('footer.services.videoProduction'), href: '#' },
  { name: t('footer.services.creativeDesign'), href: '#' },
  { name: t('footer.services.socialMedia'), href: '#' },
  { name: t('footer.services.contentStrategy'), href: '#' },
  { name: t('footer.services.dataAnalytics'), href: '#' },
];

export function Footer() {
  const { t } = useLanguage();
  const services = getServices(t);
  return (
    <footer className="relative bg-[#0F0F0F] border-t border-[#ECE7E1]/10">
      
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7F2C4C] via-[#A84CB4] via-[#51AE92] to-transparent opacity-30" />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mb-3 cursor-pointer hover:opacity-80 transition-opacity w-[110px] h-auto"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              aria-label="Go to top"
            >
              <Logo />
            </div>
            <p className="font-['Lato'] text-[#ECE7E1]/50 leading-relaxed mb-5 max-w-sm text-xs">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#181818] border border-[#ECE7E1]/10 text-[#ECE7E1]/60 hover:text-[#ECE7E1] transition-all duration-300"
                    style={{
                      '--hover-color': social.color,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = social.color + '40';
                      e.currentTarget.style.backgroundColor = social.color + '10';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(236, 231, 225, 0.1)';
                      e.currentTarget.style.backgroundColor = '#181818';
                    }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] mb-4 text-sm">
              {t('footer.services')}
            </h4>
            <nav className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {services.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="font-['Lato'] block text-[#ECE7E1]/50 hover:text-[#B3C19A] hover:translate-x-1 transition-all duration-300 text-xs"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Company Links & Office Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 grid grid-cols-2 gap-6"
          >
            {/* Company Links */}
            <div>
              <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] mb-4 text-sm">
                {t('footer.company')}
              </h4>
              <nav className="space-y-1.5">
                <motion.a
                  key="Creative"
                  href="#creative"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('creative');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="font-['Lato'] block text-[#ECE7E1]/50 hover:text-[#51AE92] hover:translate-x-1 transition-all duration-300 text-xs"
                >
                  {t('nav.creative')}
                </motion.a>
                <motion.a
                  key="Marketing"
                  href="#marketing"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('marketing');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.30 }}
                  className="font-['Lato'] block text-[#ECE7E1]/50 hover:text-[#51AE92] hover:translate-x-1 transition-all duration-300 text-xs"
                >
                  {t('nav.marketing')}
                </motion.a>
                <motion.a
                  key="Our Work"
                  href="#blog"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('blog');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="font-['Lato'] block text-[#ECE7E1]/50 hover:text-[#51AE92] hover:translate-x-1 transition-all duration-300 text-xs"
                >
                  {t('nav.insights')}
                </motion.a>
                <motion.a
                  key="Contact"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('contact');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.40 }}
                  className="font-['Lato'] block text-[#ECE7E1]/50 hover:text-[#51AE92] hover:translate-x-1 transition-all duration-300 text-xs"
                >
                  {t('nav.contact')}
                </motion.a>
              </nav>
            </div>

            {/* Office Hours */}
            <div>
              <h4 className="font-['Josefin_Sans'] text-[#B3C19A] mb-4 text-sm">
                Office Hours
              </h4>
              <div className="space-y-1 font-['Lato'] text-[#ECE7E1]/50 text-xs">
                <p>Mon - Fri: 9:00 - 17:00</p>
                <p>Sat - Sun: Closed</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 border-t border-[#ECE7E1]/5 flex flex-col md:flex-row justify-between items-center gap-3"
        >
          <p className="font-['Lato'] text-[#ECE7E1]/30 text-[10px]">
            © 2025 Tap Agency. All rights reserved.
          </p>
          <div className="flex gap-5 text-[10px]">
            <a href="#" className="font-['Lato'] text-[#ECE7E1]/30 hover:text-[#B3C19A] transition-colors">
              Privacy
            </a>
            <a href="#" className="font-['Lato'] text-[#ECE7E1]/30 hover:text-[#B3C19A] transition-colors">
              Terms
            </a>
            <a href="#" className="font-['Lato'] text-[#ECE7E1]/30 hover:text-[#B3C19A] transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}