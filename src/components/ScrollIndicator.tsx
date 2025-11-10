import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'STUDIO', color: '#7F2C4C' },
  { id: 'creative', label: 'CREATIVE', color: '#A84CB4' },
  { id: 'marketing', label: 'MARKETING', color: '#51AE92' },
  { id: 'contact', label: 'CONTACT', color: '#B3C19A' },
];

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const offsetTop = element.offsetTop;
          
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i].id);
            return;
          }
        }
      }
      
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const menuBarHeight = 80;
      const spacing = 40;
      const yOffset = -(menuBarHeight + spacing);
      
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="flex flex-col gap-5">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div key={section.id} className="relative group">
              <button
                onClick={() => scrollToSection(section.id)}
                className="relative w-8 h-8 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
                aria-label={`Go to ${section.label}`}
              >
                {/* Active dot with glow */}
                <motion.div
                  className="w-2.5 h-2.5 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: isActive ? section.color : '#666666',
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.6,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  whileHover={{
                    scale: 1.2,
                    opacity: 1,
                    backgroundColor: section.color,
                  }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Glow effect for active */}
                {isActive && (
                  <motion.div
                    className="absolute w-2.5 h-2.5 rounded-full blur-sm pointer-events-none"
                    style={{
                      backgroundColor: section.color,
                    }}
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </button>

              {/* Hover label */}
              <motion.div
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
              >
                <div 
                  className="px-3 py-1.5 rounded-md border"
                  style={{
                    backgroundColor: '#1A1A1A',
                    borderColor: `${section.color}40`,
                  }}
                >
                  <span 
                    className="font-['Josefin_Sans'] text-xs tracking-wider"
                    style={{ color: section.color }}
                  >
                    {section.label}
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
