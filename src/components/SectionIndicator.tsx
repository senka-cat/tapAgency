import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import Logo from '../imports/Logo';
import { useLanguage } from './LanguageContext';

interface Section {
  id: string;
  name: string;
  label: string;
  color: string;
  showLogo?: boolean;
}

const sections: Section[] = [
  { id: 'hero', name: 'hero', label: '', color: '#B3C19A', showLogo: true },
  { id: 'creative', name: 'creative', label: 'section.creative', color: '#7F2C4C' },
  { id: 'marketing', name: 'marketing', label: 'section.marketing', color: '#51AE92' },
  { id: 'blog', name: 'blog', label: 'section.blog', color: '#B3C19A' },
  { id: 'contact', name: 'contact', label: 'section.contact', color: '#A84CB4' },
];

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check each section and find which one is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't show on hero section
  if (activeSection.showLogo) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] md:hidden"
    >
      <div className="flex items-center justify-between px-4 mt-4">
        {/* Section Label */}
        <motion.div 
          className="px-6 py-3 rounded-full backdrop-blur-sm border-2 shadow-2xl transition-colors duration-300"
          style={{
            backgroundColor: 'rgba(26, 26, 26, 0.6)',
            borderColor: `${activeSection.color}50`,
          }}
          layout
        >
          <motion.div
            key={activeSection.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-['Lato'] tracking-wide text-xs"
            style={{ color: activeSection.color }}
          >
            {t(activeSection.label)}
          </motion.div>
        </motion.div>

        {/* Language Switcher */}
        <motion.button
          onClick={() => setLanguage(language === 'en' ? 'bs' : 'en')}
          className="px-4 py-3 rounded-full backdrop-blur-sm border-2 shadow-2xl transition-colors duration-300 flex items-center gap-2"
          style={{
            backgroundColor: 'rgba(26, 26, 26, 0.6)',
            borderColor: '#B3C19A50',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe 
            className="w-4 h-4" 
            style={{ color: '#B3C19A' }}
            strokeWidth={2}
          />
          <span className="font-['Lato'] text-xs uppercase" style={{ color: '#B3C19A' }}>
            {language}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
