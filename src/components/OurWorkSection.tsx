import { motion, AnimatePresence } from 'motion/react';
import { Image, Sparkles, Video, ChevronRight, Palette } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, UIEvent, useEffect, useRef, useCallback } from 'react';
import EstetikaFront from '../assets/static/estetika1.png';
import EstetikaBack from '../assets/static/estetika2.png';
import HoroskopFront from '../assets/static/horoskop1.png';
import HoroskopBack from '../assets/static/horoskop2.png';
import FabrikaFront from '../assets/static/fab1.png';
import FabrikaBack from '../assets/static/fab2.png';
import GrabGoFront from '../assets/static/gng1.png';
import GrabGoBack from '../assets/static/gng2.png';
import NikolinaFront from '../assets/static/nikolina1.png';
import NikolinaBack from '../assets/static/nikolina2.png';
import PopayFront from '../assets/static/popay1.png';
import PopayBack from '../assets/static/popay2.png';
import KoktelFront from '../assets/static/koktel1.png';
import KoktelBack from '../assets/static/koktel2.png';
import TeslaBrand from '../assets/brand/teslaBrand.png';
import FabrikaBrand from '../assets/brand/fabrikaBrand.png';
import FabrikaBrand2 from '../assets/brand/fabrikaBrand2.png';
import GrabBrand from '../assets/brand/grabBrand.png';
import { useLanguage } from './LanguageContext';

export interface CreativeMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  backSrc?: string;
}

export interface WorkPost {
  id: string;
  title: string;
  description: string;
  accent: string;
  icon: any;
  creativeMedia: CreativeMedia[];
}

const getWorkPosts = (t: (key: string) => string): WorkPost[] => [
  {
    id: '0',
    title: 'Branding',
    description: 'Complete visual identity systems including logos, brand guidelines, and cohesive design language.',
    accent: '#D4A574',
    icon: Palette,
    creativeMedia: [
      {
        id: 'branding-1',
        type: 'image',
        src: TeslaBrand,
        alt: 'Teslaa brand guidelines and visual identity',
      },
      {
        id: 'branding-2',
        type: 'image',
        src: FabrikaBrand,
        alt: 'Fabrika Coffee brand guidelines and visual identity',
      },
      {
        id: 'branding-3',
        type: 'image',
        src: GrabBrand,
        alt: 'Grab & Go brand guidelines and visual identity',
      },
      {
        id: 'branding-4',
        type: 'image',
        src: FabrikaBrand2,
        alt: 'Fabrika Coffee Sip & Paint event poster',
      },
    ],
  },
  {
    id: '1',
    title: 'Static Creatives',
    description: 'Eye-catching graphics and designs crafted for social media posts that stop the scroll.',
    accent: '#7F2C4C',
    icon: Image,
    creativeMedia: [
      {
        id: 'static-1',
        type: 'image',
        src: EstetikaFront,
        backSrc: EstetikaBack,
        alt: 'Line Correction (BTX-HA) campaign creative front',
      },
      {
        id: 'static-2',
        type: 'image',
        src: HoroskopFront,
        backSrc: HoroskopBack,
        alt: 'Fabrika Coffee horoscope story front',
      },
      {
        id: 'static-3',
        type: 'image',
        src: FabrikaFront,
        backSrc: FabrikaBack,
        alt: 'Fabrika Coffee static creative front',
      },
      {
        id: 'static-4',
        type: 'image',
        src: GrabGoFront,
        backSrc: GrabGoBack,
        alt: 'Grab & Go static creative front',
      },
      {
        id: 'static-5',
        type: 'image',
        src: NikolinaFront,
        backSrc: NikolinaBack,
        alt: 'Nikolina static creative front',
      },
      {
        id: 'static-6',
        type: 'image',
        src: PopayFront,
        backSrc: PopayBack,
        alt: 'Popay static creative front',
      },
      {
        id: 'static-7',
        type: 'image',
        src: KoktelFront,
        backSrc: KoktelBack,
        alt: 'Koktel static creative front',
      },
    ],
  },
  {
    id: '2',
    title: 'Animated Creatives',
    description: 'Dynamic motion graphics and animations designed to engage and captivate social audiences.',
    accent: '#51AE92',
    icon: Sparkles,
    creativeMedia: [
      {
        id: 'animated-1',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/wj82f7kuqw91j8fatnr5x/kafice.mp4?rlkey=vmw2p62y6p7e96zz5289ycowh&st=xfh22rfq&dl=0',
        alt: 'Animated video showcasing café branding motion graphics',
      },
      {
        id: 'animated-2',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/jnjw6r1lqt1hjqjgbgthq/Fabrika_Sladoled.mp4?rlkey=eqgu1rnsutlarxp4ulis0asjw&st=3hacyh7w&dl=0',
        alt: 'Fabrika Sladoled animated video',
      },
      {
        id: 'animated-3',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/2qa61jo0nrialveq8mu1r/Tap_logo_animation.mp4?rlkey=ykns9j6mk92bdnu6g29kgbzr6&st=3yyhcd2d&dl=0',
        alt: 'Animated logo reveal for Tap Agency',
      },
      {
        id: 'animated-4',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/8u5iueevlnpm5lhmaksjg/Orasasti-plodovi.mp4?rlkey=sy8i6rv16k6whcfkqc2sxhbi1&st=jkjfqj3k&dl=0',
        alt: 'Animated video highlighting product motion graphics',
      },
      {
        id: 'animated-5',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/weme7g5gkl869w9l76oq4/PopayLogo_reveal.mp4?rlkey=w2e9qqod5o2si6lxr8p9m9dm2&st=ppiy1o2c&dl=0',
        alt: 'Popay Logo reveal animation',
      },
      {
        id: 'animated-6',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/63igynestlo3j8dl2i9vx/Fabrika_Sladoled-Okusi.mp4?rlkey=iapubxmt6m39dgfo77hfjxprk&st=23sq5cyr&dl=0',
        alt: 'Fabrika Sladoled Okusi animated video',
      },
    ],
  },
  {
    id: '3',
    title: 'Video Creatives',
    description: 'Professional video content optimized for social platforms that tells your brand story.',
    accent: '#A84CB4',
    icon: Video,
    creativeMedia: [
      {
        id: 'video-1',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/6wy6x8ldngv9xuo6tjpo2/Fabrika-video-event.mov?rlkey=fsat3n7w8nprihmg7e7fypc53&st=hrguxelv&dl=0',
        alt: 'Fabrika video event',
      },
      {
        id: 'video-2',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/5k11z8rxyc1c7nptel7r9/Trattoria-UNO-Video-2.MP4?rlkey=6vo3iyhriqutlmqz5u89yvoh8&st=gdgcooe1&dl=0',
        alt: 'Trattoria UNO Video 2',
      },
      {
        id: 'video-3',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/4cf17cl2vrfjuasxpd4xx/HVALA-VAM-GARDEN-BRUNCH.mp4?rlkey=b4pjn07qfmwktf8md3oatzxpm&st=umjdlsbn&dl=0',
        alt: 'HVALA VAM GARDEN BRUNCH',
      },
      {
        id: 'video-4',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/alngujt97473mmo469fvh/Grab-Go.mov?rlkey=3qgeirdfzfziv380bcwlr6t2t&st=cbbvaget&dl=0',
        alt: 'Grab & Go video',
      },
      {
        id: 'video-5',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/34bxlyfu47llhp8u6s5m2/Solazur-video-Spanija.mp4?rlkey=gjz3iflb3uvu6jcnwbxj80knt&st=a6y2d9yp&dl=0',
        alt: 'Solazur video Spanija',
      },
      {
        id: 'video-6',
        type: 'video',
        src: 'https://dl.dropboxusercontent.com/scl/fi/ck6spy5bku65pxe37tafj/KAKTUS-VIDEO_1.mp4?rlkey=6mqth6nm15tbrvff67jpqmdva&st=53pzbrch&dl=0',
        alt: 'KAKTUS VIDEO 1',
      },
    ],
  },
];

// Mobile work card button component with scroll detection
function MobileWorkCardButton({
  work,
  index,
  isExpanded,
  onToggle,
}: {
  work: WorkPost;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number, isExpanded: boolean, touchMoved: boolean, force?: boolean) => void;
}) {
  const Icon = work.icon;
  const touchStateRef = useRef({
    touchStartY: 0,
    touchStartTime: 0,
    touchMoved: false,
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStateRef.current.touchStartY = touch.clientY;
      touchStateRef.current.touchStartTime = Date.now();
      touchStateRef.current.touchMoved = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch && touchStateRef.current.touchStartTime > 0) {
      const deltaY = Math.abs(touch.clientY - touchStateRef.current.touchStartY);
      if (deltaY > 10) {
        touchStateRef.current.touchMoved = true;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const state = touchStateRef.current;
    const touch = e.changedTouches[0];
    if (touch && state.touchStartTime > 0) {
      const timeDiff = Date.now() - state.touchStartTime;
      const deltaY = Math.abs(touch.clientY - state.touchStartY);
      
      // Only toggle if it was a quick tap (not a scroll on the button itself)
      // Allow toggle even if page scrolled, as long as finger didn't move on button
      if (!state.touchMoved && timeDiff < 300 && deltaY < 10) {
        e.preventDefault();
        e.stopPropagation();
        // Force toggle since it's a valid tap
        onToggle(index, isExpanded, false, true);
      }
    }
    // Reset touch state
    touchStateRef.current.touchStartTime = 0;
    touchStateRef.current.touchMoved = false;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(index, isExpanded, false, true);
  };

  return (
    <div>
      {/* Work Button */}
      <motion.button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full text-left overflow-hidden rounded-xl p-4 group cursor-pointer"
        style={{
          // Allow pan-y for vertical scrolling when card is expanded
          touchAction: isExpanded ? 'pan-y' : 'manipulation',
          background: isExpanded 
            ? `linear-gradient(135deg, ${work.accent}15, ${work.accent}08)`
            : 'transparent',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: isExpanded ? work.accent : `${work.accent}30`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Animated floating dots */}
        {!isExpanded && [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-20 pointer-events-none"
            style={{
              backgroundColor: work.accent,
              top: `${30 + i * 20}%`,
              right: `${10 + (i % 2) * 5}%`,
            }}
            animate={{
              y: [0, -12, 0],
              x: [0, 6, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* Icon */}
            <div 
              className="p-2.5 rounded-lg inline-block mb-2"
              style={{
                backgroundColor: isExpanded ? `${work.accent}30` : `${work.accent}15`,
              }}
            >
              <Icon 
                className="w-5 h-5" 
                style={{ color: work.accent }} 
                strokeWidth={1.5} 
              />
            </div>
            
            {/* Title */}
            <h3 
              className="font-['Josefin_Sans'] text-lg mb-1 transition-colors duration-300"
              style={{ color: isExpanded ? work.accent : '#ECE7E1' }}
            >
              {work.title}
            </h3>
            
            {/* Description */}
            <p className="font-['Lato'] text-[#ECE7E1]/70 text-xs leading-relaxed">
              {work.description}
            </p>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex-shrink-0 flex items-center pt-1">
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronRight 
                className="w-5 h-5" 
                style={{ color: work.accent }}
                strokeWidth={2.5}
              />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-visible"
            style={{ 
              minHeight: '500px',
              // Prevent any scroll behavior that could cause snapping
              scrollMargin: 0,
              scrollPadding: 0,
            }}
          >
            <div 
              className="pt-4 pb-2 px-2" 
              style={{ 
                height: '500px', 
                display: 'flex', 
                flexDirection: 'column',
                // Prevent scroll snapping
                scrollSnapAlign: 'none',
                scrollSnapStop: 'normal',
                // Ensure pointer events work and allow touch
                pointerEvents: 'auto',
              }}
            >
              <WorkGalleryPanel work={work} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual work card component
function WorkCard({ 
  work, 
  isActive, 
  onClick 
}: { 
  work: WorkPost; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const IconComponent = work.icon;
  
  return (
    <motion.div
      onClick={onClick}
      className="relative p-5 md:p-7 rounded-xl md:rounded-2xl cursor-pointer border transition-all duration-500 overflow-hidden group"
      style={{
        backgroundColor: isActive ? `${work.accent}08` : '#0F0F0F',
        borderColor: isActive ? `${work.accent}60` : `${work.accent}20`,
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background accent glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${work.accent}15 0%, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-start gap-3 md:gap-4">
        {/* Icon with orbital animation when active */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${work.accent}15`,
              borderWidth: '1.5px',
              borderColor: isActive ? work.accent : `${work.accent}30`,
            }}
            animate={isActive ? {
              borderColor: [work.accent, `${work.accent}60`, work.accent],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconComponent 
              className="w-5.5 h-5.5 md:w-6.5 md:h-6.5" 
              style={{ color: work.accent }}
              strokeWidth={2}
            />
          </motion.div>
          
          {/* Orbital dots when active */}
          <AnimatePresence>
            {isActive && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: work.accent,
                      top: '50%',
                      left: '50%',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      x: [
                        Math.cos((i * 120 * Math.PI) / 180) * 30,
                        Math.cos(((i * 120 + 360) * Math.PI) / 180) * 30,
                      ],
                      y: [
                        Math.sin((i * 120 * Math.PI) / 180) * 30,
                        Math.sin(((i * 120 + 360) * Math.PI) / 180) * 30,
                      ],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3 
            className="font-['Josefin_Sans'] text-[#ECE7E1] mb-2 transition-colors duration-300"
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.4',
            }}
          >
            {work.title}
          </h3>
          <p 
            className="text-[#ECE7E1]/60 transition-colors duration-300 line-clamp-2"
            style={{
              fontSize: '0.9375rem',
              lineHeight: '1.5',
            }}
          >
            {work.description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="flex-shrink-0 flex items-center">
          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronRight 
              className="w-5 h-5 md:w-6 md:h-6" 
              style={{ color: work.accent }}
              strokeWidth={2.5}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Floating accent dots */}
      <div className="absolute top-2 right-2 flex gap-1">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: `${work.accent}40` }}
            animate={{
              y: [-2, 2, -2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Gallery panel for right column - shows 2 images with scrolling
function WorkGalleryPanel({ work }: { work: WorkPost }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [flippedMedia, setFlippedMedia] = useState<Record<string, boolean>>({});
  const [hoveredMedia, setHoveredMedia] = useState<string | null>(null);
  const [loadingVideos, setLoadingVideos] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    setFlippedMedia({});
    setHoveredMedia(null);
    // Reset loading states when work changes
    setLoadingVideos({});
  }, [work.id]);

  // Detect mobile for scroll snap
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getScrollAmount = () => {
    const container = containerRef.current;
    if (!container) return 0;

    const firstCard = container.querySelector<HTMLElement>('[data-gallery-card]');
    if (!firstCard) return container.clientWidth;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(container).columnGap || '0');

    return cardWidth + gap;
  };

  const toggleFlip = (mediaId: string) => {
    setFlippedMedia(prev => ({
      ...prev,
      [mediaId]: !prev[mediaId],
    }));
  };
  
  const scrollToNext = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  };
  
  const scrollToPrev = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  };
  
  return (
    <motion.div
      key={work.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col"
    >
      {/* Creative Image Gallery - scrollable */}
      <div className="flex-1 flex flex-col">
        <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] text-lg md:text-xl mb-3 md:mb-4">
          Creative Library
        </h4>
        
        {/* Gallery Container */}
        <div className="relative flex-1 min-h-0">
          <div 
            id={`gallery-${work.id}`}
            ref={containerRef}
            className="absolute inset-0 flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide"
            style={{
              // CRITICAL: Enable touch scrolling on Android
              touchAction: 'pan-x pan-y',
              WebkitOverflowScrolling: 'touch',
              overscrollBehaviorX: 'contain',
              overscrollBehaviorY: 'auto',
              // Disable scroll snap on mobile to prevent unwanted snapping during card expansion
              scrollSnapType: isMobile ? 'none' : 'x mandatory',
              // Prevent any scroll-related snapping or jumping
              scrollBehavior: 'auto',
              // Ensure pointer events work
              pointerEvents: 'auto',
            }}
            onScroll={(e: UIEvent<HTMLDivElement>) => {
              const target = e.target as HTMLDivElement;
              const scrollLeft = target.scrollLeft;
              const scrollWidth = target.scrollWidth - target.clientWidth;
              const scrollPercentage = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
              setScrollPosition(scrollPercentage);
            }}
          >
            {work.creativeMedia.map((media, i) => {
              const isFlippable = !!media.backSrc && media.type === 'image';
              const isFlipped = !!flippedMedia[media.id];
              const isHovered = hoveredMedia === media.id;
              const isLoading = media.type === 'video' && (loadingVideos[media.id] === undefined || loadingVideos[media.id] === true);
              // Branding (id: '0') uses 1:1 aspect ratio, others use 9:16
              const aspectRatio = work.id === '0' ? '1/1' : '9/16';
              
              return (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`relative rounded-lg md:rounded-xl overflow-hidden border flex-shrink-0 ${isFlippable ? 'flippable-card' : ''}`}
                  data-gallery-card
                  style={{
                    height: '100%',
                    aspectRatio: aspectRatio,
                    borderColor: `${work.accent}30`,
                    cursor: isFlippable ? 'pointer' : 'default',
                    // Only apply snap on desktop
                    scrollSnapAlign: isMobile ? 'none' : 'start',
                  }}
                  onClick={isFlippable ? () => toggleFlip(media.id) : undefined}
                  onMouseEnter={() => setHoveredMedia(media.id)}
                  onMouseLeave={() => setHoveredMedia((prev) => (prev === media.id ? null : prev))}
                  onFocus={() => setHoveredMedia(media.id)}
                  onBlur={() => setHoveredMedia((prev) => (prev === media.id ? null : prev))}
                  onKeyDown={
                    isFlippable
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            toggleFlip(media.id);
                          }
                        }
                      : undefined
                  }
                  role={isFlippable ? 'button' : undefined}
                  tabIndex={isFlippable ? 0 : -1}
                  aria-pressed={isFlippable ? isFlipped : undefined}
                >
                  {media.type === 'video' ? (
                    <>
                      {/* Loading Spinner */}
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: '#0A0A0A' }}>
                          <div className="relative">
                            {/* Spinning ring */}
                            <motion.div
                              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4"
                              style={{
                                borderColor: `${work.accent}20`,
                                borderTopColor: work.accent,
                              }}
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                            {/* Pulsing dot in center */}
                            <motion.div
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                              style={{ backgroundColor: work.accent }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <video
                        className="absolute inset-0 w-full h-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        crossOrigin="anonymous"
                        aria-label={media.alt || `${work.title} animation ${i + 1}`}
                        style={{
                          display: 'block',
                          objectFit: 'cover',
                          backgroundColor: '#000',
                          opacity: isLoading ? 0 : 1,
                          transition: 'opacity 0.3s ease-in-out',
                        }}
                        onLoadStart={() => {
                          setLoadingVideos(prev => ({ ...prev, [media.id]: true }));
                        }}
                        onCanPlay={() => {
                          setLoadingVideos(prev => ({ ...prev, [media.id]: false }));
                        }}
                        onLoadedData={() => {
                          setLoadingVideos(prev => ({ ...prev, [media.id]: false }));
                        }}
                        onError={() => {
                          setLoadingVideos(prev => ({ ...prev, [media.id]: false }));
                        }}
                      >
                        <source src={media.src} type={media.src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                        Your browser does not support the video tag.
                      </video>
                    </>
                  ) : isFlippable ? (
                    <div
                      className="absolute inset-0"
                      style={{
                        perspective: '1200px',
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          <ImageWithFallback
                            src={media.src}
                            alt={media.alt || `${work.title} creative ${i + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className="absolute inset-0"
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                        >
                          <ImageWithFallback
                            src={media.backSrc ?? media.src}
                            alt={
                              media.alt
                                ? `${media.alt} (Back)`
                                : `${work.title} creative ${i + 1} back`
                            }
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={media.src}
                      alt={media.alt || `${work.title} creative ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                    initial={false}
                    animate={{
                      opacity: isFlippable && !isFlipped && isHovered ? 1 : 0,
                      scale: isFlippable && !isFlipped && isHovered ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.span
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/60 text-xs font-['Lato'] uppercase tracking-[0.3em] text-white shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                      animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                      transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                      style={{
                        backdropFilter: 'blur(10px)',
                        color: '#FFFFFF',
                        backgroundColor: `${work.accent}d6`,
                      }}
                    >
                      <span className="tracking-[0.35em] text-white font-semibold">
                        TAP
                      </span>
                    </motion.span>
                  </motion.div>
                  
                  {/* Accent border glow on hover */}
                  <motion.div 
                    className="pointer-events-none absolute inset-0"
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      boxShadow: `inset 0 0 30px ${work.accent}60`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Navigation Arrows & Scroll Progress Indicator */}
        {work.creativeMedia.length > 2 && (
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-4">
            {/* Left Arrow */}
            <motion.button
              onClick={scrollToPrev}
              className="p-1.5 md:p-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: `${work.accent}15`,
                borderWidth: '1px',
                borderColor: `${work.accent}30`,
              }}
              whileHover={{
                backgroundColor: `${work.accent}25`,
                borderColor: `${work.accent}50`,
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous creatives"
            >
              <ChevronRight 
                className="w-3 h-3 md:w-3.5 md:h-3.5 rotate-180" 
                style={{ color: work.accent }}
                strokeWidth={2.5}
              />
            </motion.button>
            
            {/* Progress Dots */}
            <div className="flex gap-1.5">
              {Array.from({ length: Math.ceil(work.creativeMedia.length / 2) }).map((_, i) => {
                const totalPages = Math.ceil(work.creativeMedia.length / 2);
                const currentPage = Math.round(scrollPosition * (totalPages - 1));
                const isActive = i === currentPage;
                
                return (
                  <motion.div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? '20px' : '6px',
                      height: '6px',
                      backgroundColor: isActive ? work.accent : `${work.accent}30`,
                    }}
                    whileHover={{
                      backgroundColor: work.accent,
                      scale: 1.2,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Right Arrow */}
            <motion.button
              onClick={scrollToNext}
              className="p-1.5 md:p-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: `${work.accent}15`,
                borderWidth: '1px',
                borderColor: `${work.accent}30`,
              }}
              whileHover={{
                backgroundColor: `${work.accent}25`,
                borderColor: `${work.accent}50`,
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next creatives"
            >
              <ChevronRight 
                className="w-3 h-3 md:w-3.5 md:h-3.5" 
                style={{ color: work.accent }}
                strokeWidth={2.5}
              />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function OurWorkSection() {
  const { t } = useLanguage();
  const workPosts = getWorkPosts(t);
  // On mobile start closed, on desktop start with first tab open
  const [selectedWork, setSelectedWork] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? -1 : 0;
    }
    return 0;
  });

  // Safe setter that prevents closing tabs on desktop
  const setSelectedWorkSafe = useCallback((value: number) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      // Desktop: Never allow -1, always keep at least one tab open
      if (value < 0) {
        return; // Don't allow closing on desktop
      }
    }
    setSelectedWork(value);
  }, []);

  // Track scroll state - but don't use it to prevent card toggles
  // Cards should only close on explicit tap, not based on scroll position
  // This ref is kept for potential future use but not blocking toggles
  const scrollStateRef = useRef({
    isScrolling: false,
    lastScrollTime: 0,
    scrollStartY: 0,
  });

  // Removed scroll-based card closing prevention
  // Cards will only close on explicit user tap, not when scrolling between sections

  // Handle window resize to update selectedWork state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile: allow closing (can be -1)
        // No action needed, mobile can have no tabs open
      } else {
        // Desktop: ALWAYS keep one tab open, never allow all to be closed
        if (selectedWork < 0) {
          setSelectedWorkSafe(0);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedWork, setSelectedWorkSafe]);

  // Ensure desktop always has a tab selected (safety check)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      if (selectedWork < 0 || selectedWork >= workPosts.length) {
        setSelectedWorkSafe(0);
      }
    }
  }, [selectedWork, workPosts.length, setSelectedWorkSafe]);

  // Safe handler for card toggle that checks scroll state
  const handleCardToggle = useCallback((index: number, isExpanded: boolean, touchMoved: boolean = false, force: boolean = false) => {
    const state = scrollStateRef.current;
    const timeSinceScroll = Date.now() - state.lastScrollTime;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    
    // CRITICAL: On mobile, only prevent toggle if it's clearly a scroll gesture
    // Don't prevent toggle just because user scrolled the page - only prevent if touch moved on the button
    if (!force && !isDesktop) {
      // Mobile: Only prevent if touch moved on the button itself (scroll gesture on button)
      // Allow toggle even if page was scrolled, as long as the button wasn't scrolled on
      if (touchMoved) {
        // Touch moved on button = scroll gesture, don't toggle
        return;
      }
    }
    
    // Desktop: Only allow switching, never closing
    if (isDesktop) {
      if (isExpanded) {
        // Can't close on desktop, do nothing
        return;
      } else {
        // Switching to a different tab
        setSelectedWorkSafe(index);
      }
    } else {
      // Mobile: Allow opening/closing - only close on explicit tap (force=true or no scroll on button)
      // This allows cards to stay open when scrolling between sections
      setSelectedWorkSafe(isExpanded ? -1 : index);
    }
  }, [setSelectedWorkSafe]);

  return (
    <section id="blog" className="relative py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <div className="inline-block px-3 py-1.5 md:px-5 md:py-2 mb-4 md:mb-6 rounded-full bg-[#B3C19A]/10 border border-[#B3C19A]/30">
            <span className="font-['Lato'] text-[#B3C19A] text-xs md:text-sm tracking-wide">OUR WORK</span>
          </div>

          <h2 className="font-['Josefin_Sans'] text-[#ECE7E1] text-[clamp(32px,7vw,80px)] leading-tight tracking-tight mb-4 md:mb-6">
            Creative<br />
            <span style={{
              background: 'linear-gradient(135deg, #A81571 0%, #D946A6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '"Luckiest Guy", cursive'
            }}>
              Showcase
            </span>
          </h2>
        </motion.div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden space-y-3">
          {workPosts.map((work, index) => {
            const isExpanded = selectedWork === index;
            
            return (
              <MobileWorkCardButton
                key={work.id}
                work={work}
                index={index}
                isExpanded={isExpanded}
                onToggle={(idx, expanded, moved, force) => handleCardToggle(idx, expanded, moved, force)}
              />
            );
          })}
        </div>

        {/* Desktop Split Layout */}
        <div className="hidden md:grid grid-cols-12 gap-4 md:gap-8">
          {/* Left Side - Work Cards */}
          <div className="col-span-12 md:col-span-4 space-y-3.5 md:space-y-4">
            {workPosts.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                isActive={selectedWork === index}
                onClick={() => {
                  // Desktop: Only allow switching, never closing
                  // If clicking the active tab, do nothing (can't close)
                  // If clicking a different tab, switch to it
                  if (selectedWork !== index) {
                    setSelectedWorkSafe(index);
                  }
                  // If clicking the same tab, do nothing (prevent closing)
                }}
              />
            ))}
          </div>
          
          {/* Right Side - Gallery Panel */}
          <div className="col-span-12 md:col-span-8">
            <AnimatePresence mode="wait">
              {selectedWork >= 0 && selectedWork < workPosts.length && (
                <WorkGalleryPanel work={workPosts[selectedWork]} />
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}