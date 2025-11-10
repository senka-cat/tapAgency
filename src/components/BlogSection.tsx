import { motion, AnimatePresence } from 'motion/react';
import { Image, Zap, Video, ChevronRight, Palette } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, UIEvent } from 'react';
import { useLanguage } from './LanguageContext';

export interface WorkPost {
  id: string;
  title: string;
  description: string;
  accent: string;
  icon: any;
  creativeImages: string[];
}

const getWorkPosts = (t: (key: string) => string): WorkPost[] => [
  {
    id: '1',
    title: t('work.branding'),
    description: t('work.branding.desc'),
    accent: '#6B7FA8',
    icon: Palette,
    creativeImages: [
      'https://images.unsplash.com/photo-1762365189058-7be5b07e038b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MjY3NTE1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1681694826758-5d7cec6215e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2MjY1MzAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1645658043538-fc2bb1702cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGd1aWRlbGluZXN8ZW58MXx8fHwxNzYyNzY0OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1700887938966-01f0450aee8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBicmFuZGluZ3xlbnwxfHx8fDE3NjI3NTc1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1718670013921-2f144aba173a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmQlMjBkZXNpZ258ZW58MXx8fHwxNzYyNzE2MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1720762224315-439072aa22c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyNzE2MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: '2',
    title: t('work.static'),
    description: t('work.static.desc'),
    accent: '#7F2C4C',
    icon: Image,
    creativeImages: [
      'https://images.unsplash.com/photo-1759215524484-89c8d7ae28f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBvc3QlMjBkZXNpZ258ZW58MXx8fHwxNzYyNzI2MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682072155213-856c2ab9d629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzdG9yeSUyMHRlbXBsYXRlfGVufDF8fHx8MTc2MjYyNTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1689004624325-6edf074228dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGdyYXBoaWNzJTIwdmVydGljYWx8ZW58MXx8fHwxNzYyNzI2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyNjk0ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1729934206641-efb212c2370c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcG9zdGVyJTIwdmVydGljYWx8ZW58MXx8fHwxNzYyNzI2MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1686272702023-a71a027d5194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHNjcmVlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjI3MjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: '3',
    title: t('work.animated'),
    description: t('work.animated.desc'),
    accent: '#51AE92',
    icon: Zap,
    creativeImages: [
      'https://images.unsplash.com/photo-1689004624325-6edf074228dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGdyYXBoaWNzJTIwdmVydGljYWx8ZW58MXx8fHwxNzYyNzI2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682072155213-856c2ab9d629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzdG9yeSUyMHRlbXBsYXRlfGVufDF8fHx8MTc2MjYyNTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759215524484-89c8d7ae28f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBvc3QlMjBkZXNpZ258ZW58MXx8fHwxNzYyNzI2MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1729934206641-efb212c2370c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcG9zdGVyJTIwdmVydGljYWx8ZW58MXx8fHwxNzYyNzI2MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1686272702023-a71a027d5194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHNjcmVlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjI3MjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyNjk0ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: '4',
    title: t('work.video'),
    description: t('work.video.desc'),
    accent: '#A84CB4',
    icon: Video,
    creativeImages: [
      'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyNjk0ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1686272702023-a71a027d5194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHNjcmVlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjI3MjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759215524484-89c8d7ae28f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBvc3QlMjBkZXNpZ258ZW58MXx8fHwxNzYyNzI2MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1689004624325-6edf074228dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGdyYXBoaWNzJTIwdmVydGljYWx8ZW58MXx8fHwxNzYyNzI2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1729934206641-efb212c2370c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcG9zdGVyJTIwdmVydGljYWx8ZW58MXx8fHwxNzYyNzI2MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682072155213-856c2ab9d629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzdG9yeSUyMHRlbXBsYXRlfGVufDF8fHx8MTc2MjYyNTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
];

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
  
  const scrollToNext = () => {
    const container = document.getElementById(`gallery-${work.id}`);
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollToPrev = () => {
    const container = document.getElementById(`gallery-${work.id}`);
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
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
      {/* Creative Image Gallery - 2 columns, 9:16 aspect ratio, scrollable */}
      <div className="flex-1 flex flex-col">
        <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] text-lg md:text-xl mb-3 md:mb-4">
          Creative Library
        </h4>
        
        {/* Gallery Container with fixed 9:16 aspect ratio */}
        <div className="relative flex-1 min-h-0">
          <div 
            id={`gallery-${work.id}`}
            className="absolute inset-0 flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
            }}
            onScroll={(e: UIEvent<HTMLDivElement>) => {
              const target = e.target as HTMLDivElement;
              const scrollLeft = target.scrollLeft;
              const scrollWidth = target.scrollWidth - target.clientWidth;
              const scrollPercentage = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
              setScrollPosition(scrollPercentage);
            }}
          >
            {work.creativeImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="relative rounded-lg md:rounded-xl overflow-hidden border group/creative cursor-pointer flex-shrink-0 snap-start"
                style={{
                  height: '100%',
                  aspectRatio: '9/16',
                  borderColor: `${work.accent}30`,
                }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${work.title} creative ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/creative:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, ${work.accent}90 100%)`,
                  }}
                />
                
                {/* Accent border glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/creative:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `inset 0 0 30px ${work.accent}60`,
                  }}
                />
              </motion.div>
            ))}
            
            {/* Right fade overlay */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-20 md:w-32 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to left, #0A0A0A 0%, transparent 100%)',
              }}
            />
          </div>
        </div>
        
        {/* Navigation Arrows & Scroll Progress Indicator */}
        {work.creativeImages.length > 2 && (
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
              {Array.from({ length: Math.ceil(work.creativeImages.length / 2) }).map((_, i) => {
                const totalPages = Math.ceil(work.creativeImages.length / 2);
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

export function BlogSection() {
  const { t } = useLanguage();
  const workPosts = getWorkPosts(t);
  const [selectedWork, setSelectedWork] = useState(0);

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
            const Icon = work.icon;
            
            return (
              <div key={work.id}>
                {/* Work Button */}
                <motion.button
                  onClick={() => {
                    setSelectedWork(isExpanded ? -1 : index);
                  }}
                  className="relative w-full text-left overflow-hidden rounded-xl p-4 group cursor-pointer"
                  style={{
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
                  
                  <div className="relative z-10">
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
                </motion.button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 px-2">
                        <WorkGalleryPanel work={work} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                  if (selectedWork === index) {
                    setSelectedWork(-1);
                  } else {
                    setSelectedWork(index);
                  }
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