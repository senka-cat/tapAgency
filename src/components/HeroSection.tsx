import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Globe } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import heroImage from '../assets/heropicture.png';
import Logo from '../imports/Logo';
import SimpleLogo from '../imports/Logo-61-550';
import Ellipse8 from '../imports/Ellipse8';
import { useLanguage } from './LanguageContext';

const partnerLogos = [
  { src: new URL('../assets/logosi/Logo 2.svg', import.meta.url).href, alt: 'Partner logo 2' },
  { src: new URL('../assets/logosi/Logo 3.svg', import.meta.url).href, alt: 'Partner logo 3' },
  { src: new URL('../assets/logosi/Logo 7.svg', import.meta.url).href, alt: 'Partner logo 7' },
  { src: new URL('../assets/logosi/Logo 8.svg', import.meta.url).href, alt: 'Partner logo 8' },
  { src: new URL('../assets/logosi/Logo 10.svg', import.meta.url).href, alt: 'Partner logo 10' },
  { src: new URL('../assets/logosi/Logo 11.svg', import.meta.url).href, alt: 'Partner logo 11' },
  { src: new URL('../assets/logosi/Logo 12.svg', import.meta.url).href, alt: 'Partner logo 12' },
];

// Animated Counter Component - Matching Hero Box Style
function StatCounter({ 
  value, 
  suffix = '', 
  label, 
  color,
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  label: string; 
  color: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (hasAnimated || shouldAnimate) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;

    let frameId: number;
    let startTime: number | null = null;
    const duration = 2000;

    const startAnimation = () => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setDisplayValue(Math.round(progress * value));

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
          setHasAnimated(true);
        }
      };

      frameId = requestAnimationFrame(step);
    };

    const timeoutId = window.setTimeout(startAnimation, (delay + 0.5) * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [shouldAnimate, hasAnimated, value, delay]);

  return (
    <motion.div
      className="relative text-center bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#ECE7E1]/10 rounded-2xl p-6 overflow-hidden"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        borderColor: 'rgba(236, 231, 225, 0.2)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(236, 231, 225, 0.1)',
      }}
      style={{
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(236, 231, 225, 0.08)',
      }}
    >
      {/* Subtle Inner Glow - Matching Hero Card */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
        }}
      />

      {/* Number */}
      <div className="relative mb-2 z-10">
        <div className="font-['Josefin_Sans'] text-[#ECE7E1] text-3xl md:text-4xl tracking-tight inline-flex items-baseline">
          <span>{displayValue}</span>
          <span>{suffix}</span>
        </div>
      </div>

      {/* Label */}
      <div className="font-['Lato'] text-[#ECE7E1]/60 text-xs md:text-sm relative z-10">
        {label}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  const calculateSectionScrollTarget = useCallback((section: HTMLElement) => {
    const rect = section.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const elementHeight = rect.height;
    const centerOffset = viewportHeight / 2 - Math.min(elementHeight, viewportHeight) / 2;
    const offset = Math.max(80, centerOffset);
    return Math.max(0, rect.top + scrollTop - offset);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
      behavior: 'smooth',
      block: sectionId === 'hero' ? 'start' : 'center',
      inline: 'nearest',
    });
  }, []);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Slower, smoother spring animation for parallax with easing
  const springConfig = { damping: 30, stiffness: 80, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Parallax transforms - dots move more, image moves less
  const dotsX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
  const dotsY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);
  const imageX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const imageY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    // Get hero section height
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      setHeroHeight(heroSection.clientHeight);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const halfHero = heroHeight / 2;
      
      // Trigger morph when scrolled past half of hero section
      setScrolled(scrollPosition > halfHero);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        setHeroHeight(heroSection.clientHeight);
      }
    });
    
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleScroll);
    };
  }, [heroHeight, mouseX, mouseY]);

  const scrollingLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section id="hero" className="relative py-8 px-4 sm:px-6 bg-[#0A0A0A] overflow-hidden">
      
      {/* Subtle Background Gradient for Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#B3C19A]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#7F2C4C]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#A84CB4]/3 rounded-full blur-[100px]" />
      </div>

      {/* Navigation Container */}
      <div className="hidden md:flex fixed left-1/2 -translate-x-1/2 z-[100] items-center gap-3 pointer-events-none" 
        style={{ 
          top: scrolled ? '1rem' : '1.5rem',
          transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Fixed Floating Navigation */}
        <motion.nav
          className="flex backdrop-blur-2xl border rounded-full items-center pointer-events-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: scrolled ? '680px' : 'calc(100vw - 9rem)',
            maxWidth: scrolled ? '680px' : '1500px',
            paddingLeft: scrolled ? '16px' : '24px',
            paddingRight: scrolled ? '16px' : '24px',
            paddingTop: scrolled ? '10px' : '12px',
            paddingBottom: scrolled ? '10px' : '12px',
            backgroundColor: scrolled ? 'rgba(33, 35, 40, 0.95)' : 'rgba(33, 35, 40, 0.4)',
            borderColor: scrolled ? 'rgba(236, 231, 225, 0.3)' : 'rgba(236, 231, 225, 0.2)',
            boxShadow: scrolled 
              ? '0 12px 40px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(236, 231, 225, 0.15)' 
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(236, 231, 225, 0.1)',
            justifyContent: scrolled ? 'center' : 'space-between',
          }}
        >
          <motion.div 
          className="relative flex items-center shrink-0 pointer-events-auto"
          animate={{
            width: scrolled ? '50px' : '110px',
            height: scrolled ? '20px' : '24px',
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Full Logo - Shows when not scrolled */}
          <motion.div 
            onClick={() => {
              scrollToSection('hero');
            }}
            className="absolute top-0 left-0 cursor-pointer hover:opacity-80 transition-opacity h-full"
            style={{ width: '110px' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollToSection('hero');
              }
            }}
            aria-label="Go to top"
            animate={{
              opacity: scrolled ? 0 : 1,
              scale: scrolled ? 0.8 : 1,
              pointerEvents: scrolled ? 'none' : 'auto',
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Logo />
          </motion.div>

          {/* Simple Logo - Shows when scrolled */}
          <motion.div 
            onClick={() => {
              scrollToSection('hero');
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity h-full"
            style={{ width: '50px' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollToSection('hero');
              }
            }}
            aria-label="Go to top"
            animate={{
              opacity: scrolled ? 1 : 0,
              scale: scrolled ? 1 : 0.8,
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <SimpleLogo />
          </motion.div>
        </motion.div>

        <motion.div 
          className="hidden md:flex items-center pointer-events-auto"
          animate={{
            gap: scrolled ? '8px' : '32px',
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.button 
            onClick={() => scrollToSection('creative')}
            className="font-['Lato'] text-[#ECE7E1] transition-all relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              fontSize: scrolled ? '0.875rem' : '0.875rem',
              paddingLeft: scrolled ? '12px' : '0px',
              paddingRight: scrolled ? '12px' : '0px',
              paddingTop: scrolled ? '8px' : '0px',
              paddingBottom: scrolled ? '8px' : '0px',
              opacity: scrolled ? 0.8 : 0.7,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="relative">
              {t('nav.creative')}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#7F2C4C]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('marketing')}
            className="font-['Lato'] text-[#ECE7E1] transition-all relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              fontSize: scrolled ? '0.875rem' : '0.875rem',
              paddingLeft: scrolled ? '12px' : '0px',
              paddingRight: scrolled ? '12px' : '0px',
              paddingTop: scrolled ? '8px' : '0px',
              paddingBottom: scrolled ? '8px' : '0px',
              opacity: scrolled ? 0.8 : 0.7,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="relative">
              {t('nav.marketing')}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#51AE92]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('blog')}
            className="font-['Lato'] text-[#ECE7E1] transition-all relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              fontSize: scrolled ? '0.875rem' : '0.875rem',
              paddingLeft: scrolled ? '12px' : '0px',
              paddingRight: scrolled ? '12px' : '0px',
              paddingTop: scrolled ? '8px' : '0px',
              paddingBottom: scrolled ? '8px' : '0px',
              opacity: scrolled ? 0.8 : 0.7,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="relative">
              {t('nav.insights')}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#B3C19A]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('contact')}
            className="rounded-full font-['Lato'] shadow-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              paddingLeft: scrolled ? '16px' : '24px',
              paddingRight: scrolled ? '16px' : '24px',
              paddingTop: scrolled ? '8px' : '8px',
              paddingBottom: scrolled ? '8px' : '8px',
              fontSize: scrolled ? '0.875rem' : '0.875rem',
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'linear-gradient(135deg, #7F2C4C 0%, #A84CB4 100%)',
              color: '#ECE7E1',
            }}
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, #A84CB4 0%, #7F2C4C 100%)',
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative">{t('nav.letsTalk')}</span>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Language Switcher Button - Separate Circle */}
      <motion.button
        onClick={() => setLanguage(language === 'en' ? 'bs' : 'en')}
        className="rounded-full relative overflow-hidden group flex items-center justify-center backdrop-blur-2xl border pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          width: scrolled ? '44px' : '56px',
          height: scrolled ? '44px' : '56px',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          backgroundColor: scrolled ? 'rgba(33, 35, 40, 0.95)' : 'rgba(33, 35, 40, 0.4)',
          borderColor: scrolled ? 'rgba(236, 231, 225, 0.3)' : 'rgba(236, 231, 225, 0.2)',
          boxShadow: scrolled 
            ? '0 12px 40px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(236, 231, 225, 0.15)' 
            : '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(236, 231, 225, 0.1)',
        }}
      >
        {/* Hover background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: 'rgba(179, 193, 154, 0.2)',
          }}
          transition={{ duration: 0.3 }}
        />
        <Globe 
          className="relative z-10"
          style={{ 
            color: '#B3C19A',
            width: scrolled ? '20px' : '24px',
            height: scrolled ? '20px' : '24px',
          }}
          strokeWidth={2}
        />
      </motion.button>
    </div>

      <div className="max-w-[1600px] mx-auto pt-20">

        {/* Hero Card Container */}
        <motion.div
          className="relative bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#ECE7E1]/10 rounded-[32px] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(236, 231, 225, 0.1)',
          }}
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B3C19A]/5 via-transparent to-[#7F2C4C]/5 pointer-events-none" />

          {/* Hero Content - Grid Layout */}
          <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center px-8 md:px-20 py-12 md:py-16">
            
            {/* Left Side - Text Content */}
            <div>
              
              {/* Retro Badge */}
              <motion.div
                className="inline-flex items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-2.5 mb-6 md:mb-8 rounded-full border-2 border-[#B3C19A]/40 bg-[#B3C19A]/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-2 h-2 rounded-full bg-[#B3C19A] animate-pulse" />
                <span className="font-['Lato'] text-[#ECE7E1]/90 text-xs md:text-base">{t('hero.badge')}</span>
              </motion.div>

              {/* Main Title */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <h1 className="font-['Josefin_Sans'] text-[#ECE7E1] text-[clamp(56px,10vw,140px)] leading-[0.85] tracking-tight mb-2">
                    {t('hero.makeIt')}
                  </h1>
                </motion.div>

                <motion.div 
                  className="relative inline-block cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  whileHover={{ 
                    scale: 1.08,
                    rotate: [0, -2, 2, -1, 0],
                    transition: { 
                      scale: { duration: 0.3, ease: "easeOut" },
                      rotate: { duration: 0.5, ease: "easeInOut" }
                    }
                  }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <h1 
                    className="text-[rgb(168,21,113)] text-[clamp(56px,10vw,140px)] leading-[0.85] tracking-tight relative z-10 font-[Luckiest_Guy]"
                  >
                    {t('hero.pop')}
                  </h1>
                </motion.div>
              </div>

              {/* Description */}
              <motion.div 
                className="max-w-2xl mb-8 md:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <p className="font-['Lato'] text-[#ECE7E1]/70 text-sm md:text-lg lg:text-xl leading-relaxed">
                  {t('hero.description')}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <motion.button 
                  onClick={() => scrollToSection('creative')}
                  className="group relative px-5 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl font-['Lato'] bg-[#ECE7E1] text-[#0A0A0A] overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236, 231, 225, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10 flex items-center gap-2 md:gap-3">
                    <span className="text-sm md:text-lg">{t('hero.seeOurWork')}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                    </motion.div>
                  </div>
                </motion.button>
                
                <motion.button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-5 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl font-['Lato'] border-2 border-[#ECE7E1]/40 text-[#ECE7E1] overflow-hidden backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'rgba(236, 231, 225, 0.8)',
                    backgroundColor: 'rgba(236, 231, 225, 0.1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10 flex items-center gap-2 md:gap-3">
                    <span className="text-sm md:text-lg">
                      {t('hero.letsCollaborate')}
                    </span>
                  </div>
                </motion.button>
              </motion.div>

            </div>



          </div>

          {/* Animated Dots Formation - Mobile Version (Simpler) */}
          <motion.div 
            className="md:hidden absolute inset-0 pointer-events-none overflow-hidden"
          >
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 400 800" 
              fill="none"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Mobile dots - fewer and simpler, focused around POP text */}
              {Array.from({ length: 40 }).map((_, i) => {
                const x = 50 + Math.random() * 300;
                const y = 150 + Math.random() * 400;
                const offsetX = (Math.random() - 0.5) * 60;
                const offsetY = (Math.random() - 0.5) * 60;
                const isPink = i < 20;
                
                return (
                  <motion.circle
                    key={`mobile-dot-${i}`}
                    r="3"
                    fill={isPink ? "rgb(168, 21, 113)" : "rgb(179, 193, 154)"}
                    initial={{ 
                      cx: x,
                      cy: y,
                      opacity: 0
                    }}
                    animate={{ 
                      cx: [x, x + offsetX, x - offsetX * 0.5, x],
                      cy: [y, y + offsetY, y - offsetY * 0.5, y],
                      opacity: [0.2, 0.7, 0.4, 0.2],
                      r: [2, 4, 3, 2],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8 + Math.random() * 1.5
                    }}
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Animated Dots Formation - Desktop Version */}
          <motion.div 
            className="hidden md:block absolute inset-0 pointer-events-none overflow-visible"
            style={{
              x: dotsX,
              y: dotsY,
            }}
          >
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 1600 800" 
              fill="none"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Left side dots - PINK around POP word */}
              {Array.from({ length: 60 }).map((_, i) => {
                const x = 200 + Math.random() * 400;
                const y = 200 + Math.random() * 400;
                const offsetX = (Math.random() - 0.5) * 80;
                const offsetY = (Math.random() - 0.5) * 80;
                
                return (
                  <motion.circle
                    key={`left-pink-${i}`}
                    r="4"
                    fill="rgb(168, 21, 113)"
                    initial={{ 
                      cx: x,
                      cy: y,
                      opacity: 0
                    }}
                    animate={{ 
                      cx: [x, x + offsetX, x - offsetX * 0.5, x],
                      cy: [y, y + offsetY, y - offsetY * 0.5, y],
                      opacity: [0.3, 0.8, 0.5, 0.3],
                      r: [3, 5, 4, 3],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.0 + Math.random() * 2
                    }}
                  />
                );
              })}
              
              {/* Right side dots - GREEN behind and around the woman */}
              {Array.from({ length: 150 }).map((_, i) => {
                const x = 1050 + Math.random() * 500;
                const y = 150 + Math.random() * 600;
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                
                return (
                  <motion.circle
                    key={`right-green-${i}`}
                    r="4"
                    fill="rgb(179, 193, 154)"
                    initial={{ 
                      cx: x,
                      cy: y,
                      opacity: 0
                    }}
                    animate={{ 
                      cx: [x, x + offsetX, x - offsetX * 0.5, x],
                      cy: [y, y + offsetY, y - offsetY * 0.5, y],
                      opacity: [0.3, 0.9, 0.6, 0.3],
                      r: [3, 5.5, 4.5, 3],
                    }}
                    transition={{
                      duration: 6 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.0 + Math.random() * 2
                    }}
                  />
                );
              })}
              
              {/* Orbital dots around woman - GREEN */}
              {Array.from({ length: 80 }).map((_, i) => {
                const baseAngle = (i / 80) * Math.PI * 2;
                const orbitRadius = 150 + (i % 4) * 60;
                const centerX = 1250;
                const centerY = 420;
                
                const startX = centerX + Math.cos(baseAngle) * orbitRadius;
                const startY = centerY + Math.sin(baseAngle) * orbitRadius;
                
                return (
                  <motion.circle
                    key={`orbit-green-${i}`}
                    r="4"
                    fill="rgb(179, 193, 154)"
                    initial={{ 
                      cx: startX,
                      cy: startY,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      cx: [
                        startX,
                        centerX + Math.cos(baseAngle + Math.PI * 0.5) * orbitRadius,
                        centerX + Math.cos(baseAngle + Math.PI) * orbitRadius,
                        centerX + Math.cos(baseAngle + Math.PI * 1.5) * orbitRadius,
                        startX
                      ],
                      cy: [
                        startY,
                        centerY + Math.sin(baseAngle + Math.PI * 0.5) * orbitRadius,
                        centerY + Math.sin(baseAngle + Math.PI) * orbitRadius,
                        centerY + Math.sin(baseAngle + Math.PI * 1.5) * orbitRadius,
                        startY
                      ],
                      opacity: [0.4, 0.9, 0.7, 1, 0.4],
                      r: [3, 5, 4, 5.5, 3],
                    }}
                    transition={{
                      duration: 10 + (i % 4) * 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.0 + (i * 0.03)
                    }}
                  />
                );
              })}
              
              {/* Middle floating dots with gradient transition */}
              {Array.from({ length: 50 }).map((_, i) => {
                const x = 600 + Math.random() * 450;
                const y = 200 + Math.random() * 400;
                const offsetX = (Math.random() - 0.5) * 90;
                const offsetY = (Math.random() - 0.5) * 90;
                
                // Gradient from pink to green
                const progress = (x - 600) / 450;
                const r = Math.round(168 + (179 - 168) * progress);
                const g = Math.round(21 + (193 - 21) * progress);
                const b = Math.round(113 + (154 - 113) * progress);
                const color = `rgb(${r}, ${g}, ${b})`;
                
                return (
                  <motion.circle
                    key={`middle-gradient-${i}`}
                    r="3.5"
                    fill={color}
                    initial={{ 
                      cx: x,
                      cy: y,
                      opacity: 0
                    }}
                    animate={{ 
                      cx: [x, x + offsetX, x - offsetX * 0.5, x],
                      cy: [y, y + offsetY, y - offsetY * 0.5, y],
                      opacity: [0.2, 0.7, 0.4, 0.2],
                      r: [2.5, 4.5, 3.5, 2.5],
                    }}
                    transition={{
                      duration: 6 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2 + Math.random() * 2
                    }}
                  />
                );
              })}
              
              {/* Traveling dots from green (right) to pink (left) */}
              {Array.from({ length: 35 }).map((_, i) => {
                const startX = 1200 + Math.random() * 100;
                const startY = 350 + Math.random() * 200;
                const endX = 250 + Math.random() * 200;
                const endY = 280 + Math.random() * 120;
                const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 150;
                const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 100;
                
                return (
                  <motion.circle
                    key={`travel-${i}`}
                    r="3.5"
                    initial={{ 
                      cx: startX,
                      cy: startY,
                      opacity: 0
                    }}
                    animate={{ 
                      cx: [startX, midX, endX, startX],
                      cy: [startY, midY, endY, startY],
                      opacity: [0, 0.9, 0.4, 0],
                      r: [2, 5, 3.5, 2],
                      fill: [
                        'rgb(179, 193, 154)', // Green at start
                        'rgb(174, 107, 134)', // Gradient mid
                        'rgb(168, 21, 113)',  // Pink at end
                        'rgb(179, 193, 154)'  // Back to green
                      ]
                    }}
                    transition={{
                      duration: 9 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5 + (i * 0.12)
                    }}
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Retro Pop-Art Character Image - Desktop Only - Clipped at Bottom */}
          <motion.div
            className="hidden md:block absolute bottom-[-40px] right-8 z-20 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, type: "spring", stiffness: 120, damping: 26 }}
            style={{ 
              height: '620px',
              x: imageX,
              y: imageY,
            }}
            whileHover={{ rotate: 2.5, x: 4 }}
          >
            <motion.img
              src={heroImage}
              alt="Retro marketing character"
              className="h-[650px] w-auto object-contain object-bottom cursor-pointer"
              whileHover={{ rotate: 4, x: 6 }}
              transition={{ type: "spring", stiffness: 140, damping: 28 }}
            />
          </motion.div>

        </motion.div>

        {/* Logo Bar - Infinite Scroll Animation */}
        <motion.div 
          className="mt-8 -mx-4 sm:-mx-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="relative py-8 md:py-10 overflow-hidden">
            {/* Edge-to-edge gradient fades - Desktop only */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling Logos - Infinite Animation */}
            <motion.div 
              className="flex gap-20 md:gap-28 items-center"
              animate={{
                x: [0, -1400],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {scrollingLogos.map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="h-16 md:h-20 flex items-center opacity-80 hover:opacity-100 transition-all duration-500 flex-shrink-0 hover:scale-110"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats - Minimal Animated Counters with Progress */}
        <motion.div 
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            
            {/* Stat 1 */}
            <StatCounter
              value={100}
              suffix="%"
              label="Designed with Intention"
              color="#B3C19A"
              delay={0}
            />
            
            {/* Stat 2 */}
            <StatCounter
              value={5}
              suffix="sec"
              label="To Catch Attention"
              color="#7F2C4C"
              delay={0.1}
            />
            
            {/* Stat 3 */}
            <StatCounter
              value={120}
              suffix="+"
              label="Campaigns Optimized"
              color="#A84CB4"
              delay={0.2}
            />
            
            {/* Stat 4 */}
            <StatCounter
              value={80}
              suffix="%"
              label="Avg. Strategy Success Rate"
              color="#51AE92"
              delay={0.3}
            />
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}