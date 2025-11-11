import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const navSections = [
  { id: 'creative', labelKey: 'nav.creative', color: '#A84CB4' },
  { id: 'marketing', labelKey: 'nav.marketing', color: '#51AE92' },
  { id: 'blog', labelKey: 'nav.insights', color: '#7F2C4C' },
  { id: 'contact', labelKey: 'nav.contact', color: '#B3C19A' },
];

const detectionOrder = ['hero', ...navSections.map(section => section.id)];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { t } = useLanguage();

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show navigation: always on desktop, on mobile after scrolling 100px
      const isMobile = window.innerWidth < 768;
      setShowNav(isMobile ? scrollY > 100 : true);
      
      // Show back to top button after scrolling down
      setShowBackToTop(scrollY > 300);

      // Update active section based on scroll position
      const scrollPosition = scrollY + window.innerHeight / 2;
      
      for (let i = detectionOrder.length - 1; i >= 0; i--) {
        const section = document.getElementById(detectionOrder[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(detectionOrder[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsExpanded(false);
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });

    requestAnimationFrame(() => setIsExpanded(false));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    // Track touch positions to distinguish between taps and scrolls
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;
    let isScrolling = false;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch && navRef.current && !navRef.current.contains(event.target as Node)) {
        touchStartY = touch.clientY;
        touchStartX = touch.clientX;
        touchStartTime = Date.now();
        isScrolling = false;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      // If user moves finger significantly, they're scrolling, not tapping
      if (touchStartTime > 0) {
        const touch = event.touches[0];
        if (touch) {
          const deltaY = Math.abs(touch.clientY - touchStartY);
          const deltaX = Math.abs(touch.clientX - touchStartX);
          if (deltaY > 5 || deltaX > 5) {
            isScrolling = true;
          }
        }
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // For touch events, only close if it was a tap (not a scroll)
      if (event instanceof TouchEvent) {
        const touch = event.changedTouches[0];
        if (touch && touchStartTime > 0) {
          const timeDiff = Date.now() - touchStartTime;
          const deltaY = Math.abs(touch.clientY - touchStartY);
          const deltaX = Math.abs(touch.clientX - touchStartX);
          
          // If it was a scroll gesture or took too long, don't close
          if (isScrolling || timeDiff > 300 || deltaY > 10 || deltaX > 10) {
            touchStartTime = 0;
            return;
          }
        }
        touchStartTime = 0;
      }

      // Only close if click/tap was outside the nav element
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      // Support both mouse and touch events for better mobile compatibility
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleClickOutside, { passive: true });
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [isExpanded]);

  // Remove auto-closing on scroll - only close when user explicitly closes or selects a section
  // This prevents the menu from closing unexpectedly when scrolling

  const activeSectionData = navSections.find(s => s.id === activeSection);
  const activeColor = activeSectionData?.color || '#B3C19A';
  const activeLabel = activeSection === 'hero' ? t('nav.home') : activeSectionData ? t(activeSectionData.labelKey) : t('nav.creative');

  return (
    <>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80] md:hidden"
                    onClick={() => setIsExpanded(false)}
                    style={{ 
                      touchAction: 'none',
                      pointerEvents: 'auto'
                    }}
                  />
                )}
              </AnimatePresence>

      <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-[90] flex flex-row items-end gap-3" ref={navRef}>
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 24 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <motion.button
                className="relative flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-[#1A1A1A]/90 backdrop-blur-xl border border-[#ECE7E1]/20 shadow-2xl cursor-pointer group"
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsExpanded(prev => !prev)}
                onTouchStart={(e) => {
                  // Prevent scrolling when tapping the button
                  e.stopPropagation();
                }}
                aria-expanded={isExpanded}
                aria-label="Toggle section navigation"
                style={{ touchAction: 'manipulation' }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: activeColor }}
                />
                <span className="font-['Lato'] text-[#ECE7E1] text-xs md:text-sm whitespace-nowrap">
                  {activeLabel}
                </span>
                <motion.div
                  className="w-4 h-4 border border-[#ECE7E1]/30 rounded-full flex items-center justify-center"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M2 3l2 2 2-2" stroke="#ECE7E1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: activeColor }}
                />
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key="nav-menu"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 w-[190px] md:w-[230px] rounded-3xl bg-[#1A1A1A]/95 backdrop-blur-xl border border-[#ECE7E1]/20 shadow-2xl z-[95] pointer-events-auto"
                    style={{ bottom: 'calc(100% + 16px)', touchAction: 'manipulation' }}
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-1.5 p-3">
                      {navSections.map((section, index) => {
                        const isActive = activeSection === section.id;
                        return (
                          <motion.button
                            key={section.id}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12 }}
                            transition={{ delay: index * 0.04 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToSection(section.id);
                            }}
                            onTouchStart={(e) => {
                              // Prevent event bubbling on touch devices
                              e.stopPropagation();
                            }}
                            className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                              isActive ? 'bg-[#ECE7E1]/12' : 'hover:bg-[#ECE7E1]/6'
                            }`}
                            whileTap={{ scale: 0.97 }}
                            style={{ touchAction: 'manipulation' }}
                          >
                            <motion.div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: section.color }}
                              animate={{
                                scale: isActive ? [1, 1.2, 1] : 1,
                                boxShadow: isActive ? `0 0 12px ${section.color}` : 'none',
                              }}
                              transition={{
                                duration: 2,
                                repeat: isActive ? Infinity : 0,
                                ease: 'easeInOut',
                              }}
                            />
                            <span className="font-['Lato'] text-xs md:text-sm text-[#ECE7E1]">
                              {t(section.labelKey)}
                            </span>
                            {isActive && (
                              <motion.div
                                layoutId="floatingNavActive"
                                className="absolute inset-0 rounded-xl border border-[#ECE7E1]/15 pointer-events-none"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end" style={{ height: '48px' }}>
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="relative flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#1A1A1A]/90 backdrop-blur-xl border border-[#ECE7E1]/20 shadow-2xl group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#B3C19A]/20 to-[#B3C19A]/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <ArrowUp className="w-5 h-5 text-[#ECE7E1]" strokeWidth={2.5} />
                </div>
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: '#B3C19A' }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
