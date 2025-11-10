import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Megaphone, Globe, Check, Zap, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect, useCallback, useRef, UIEvent, MouseEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import LessButton from './LessButton';
import { ScrollArea } from './ui/scroll-area';
const brandPicture = new URL('../assets/brandpicture.png', import.meta.url).href;
const brandImageOne = new URL('../assets/brand1.png', import.meta.url).href;
const brandImageTwo = new URL('../assets/brand2.png', import.meta.url).href;
const brandImageThree = new URL('../assets/brand3.png', import.meta.url).href;
import Group1000001851 from '../imports/Group1000001851';
import { useLanguage } from './LanguageContext';

const getCreativeServices = (t: (key: string) => string) => [
  {
    icon: Palette,
    title: t('creative.brandIdentity'),
    description: t('creative.brandIdentity.desc'),
    backgroundImage: brandPicture,
    leadImage: brandImageOne,
    accent: '#7F2C4C',
    tags: [t('tags.logoDesign'), t('tags.brandStrategy'), t('tags.styleGuides')],
    portfolioImages: [
      'https://images.unsplash.com/photo-1653922841869-58867b60d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2MTgyMDUwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1633533448522-26ee3eab7961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwcGFja2FnaW5nfGVufDF8fHx8MTc2MTgwMDA5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1718670013921-2f144aba173a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmQlMjBkZXNpZ258ZW58MXx8fHwxNzYxNzc0NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1655892802496-9b1d61b8910f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMHN0YXRpb25lcnklMjBtb2NrdXB8ZW58MXx8fHwxNzYxNzUwNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    details: {
      title: t('creative.whatWeDo'),
      items: [
        t('creative.brandIdentity.detail1'),
        t('creative.brandIdentity.detail2'),
        t('creative.brandIdentity.detail3'),
        t('creative.brandIdentity.detail4'),
        t('creative.brandIdentity.detail5'),
        t('creative.brandIdentity.detail6')
      ]
    }
  },
  {
    icon: Megaphone,
    title: t('creative.marketingStrategy'),
    description: t('creative.marketingStrategy.desc'),
    backgroundImage: 'https://images.unsplash.com/photo-1742059828706-ac4087a1214e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29sbGFnZSUyMGFic3RyYWN0fGVufDF8fHx8MTc2MTY5NjkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    leadImage: brandImageTwo,
    accent: '#A84CB4',
    tags: [t('tags.seo'), t('tags.ppc'), t('tags.contentMarketing')],
    portfolioImages: [
      'https://images.unsplash.com/photo-1760787545864-b468b6fe2c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2luZyUyMGJpbGxib2FyZCUyMGNhbXBhaWdufGVufDF8fHx8MTc2MTcyNTQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1580130732478-4e339fb6836f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBwb3N0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYxODM5MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1758613655335-4619180f4bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNhbXBhaWduJTIwYWR2ZXJ0aXNpbmd8ZW58MXx8fHwxNzYxODM5MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1613759612065-d5971d32ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGFkdmVydGlzZW1lbnQlMjBsYXlvdXR8ZW58MXx8fHwxNzYxODM5MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    details: {
      title: t('creative.whatWeDo'),
      items: [
        t('creative.marketingStrategy.detail1'),
        t('creative.marketingStrategy.detail2'),
        t('creative.marketingStrategy.detail3'),
        t('creative.marketingStrategy.detail4'),
        t('creative.marketingStrategy.detail5'),
        t('creative.marketingStrategy.detail6')
      ]
    }
  },
  {
    icon: Globe,
    title: t('creative.webDevelopment'),
    description: t('creative.webDevelopment.desc'),
    backgroundImage: 'https://images.unsplash.com/photo-1760348462645-9281dddab7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzYxNjM2MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    leadImage: brandImageThree,
    accent: '#51AE92',
    tags: [t('tags.frontend'), t('tags.backend'), t('tags.ecommerce')],
    portfolioImages: [
      'https://images.unsplash.com/photo-1709455560403-79f98f108594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwbGFwdG9wfGVufDF8fHx8MTc2MTgzNDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjE3OTYzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWdufGVufDF8fHx8MTc2MTgzOTE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxNzg5NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    details: {
      title: t('creative.whatWeDo'),
      items: [
        t('creative.webDevelopment.detail1'),
        t('creative.webDevelopment.detail2'),
        t('creative.webDevelopment.detail3'),
        t('creative.webDevelopment.detail4'),
        t('creative.webDevelopment.detail5'),
        t('creative.webDevelopment.detail6')
      ]
    }
  },
];

type CreativeService = ReturnType<typeof getCreativeServices>[number];

type CompactServiceCardProps = {
  service: CreativeService;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  key?: React.Key;
};

function LeadImageFrame({ image, accent, title }: { image: string; accent: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -140, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -left-8 top-0 w-[380px] h-[520px] md:w-[460px] md:h-[600px] z-20 pointer-events-none"
      style={{
        filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
      }}
    >
      <div
        className="relative"
        style={{
          width: '617.273px',
          height: '453.054px',
          transform: 'scale(0.85)',
          transformOrigin: 'top left',
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          <ImageWithFallback
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index, isMobile, isFlipped, onFlip }: { 
  service: CreativeService, 
  index: number, 
  isMobile?: boolean,
  isFlipped: boolean,
  onFlip: (flipped: boolean) => void
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardTap = () => {
    onFlip(!isFlipped);
  };

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    onFlip(true);
  };

  const displayItems = isMobile ? service.details.items.slice(0, 3) : service.details.items.slice(0, 4);

  const handleBackClick = (e: MouseEvent) => {
    // Flip back to front when clicking the card background (not buttons)
    if (isFlipped && e.target === e.currentTarget) {
      e.stopPropagation();
      onFlip(false);
    }
  };

  // Wrapper without animations for mobile to prevent touch blocking
  const CardWrapper = isMobile ? 'div' : motion.div;
  const wrapperProps: any = isMobile 
    ? {
        className: "group relative h-[450px] md:h-[600px]",
        style: { perspective: '1000px' },
        onClick: !isFlipped ? handleCardTap : handleBackClick
      }
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.15, duration: 0.6 },
        whileHover: { y: -8, transition: { duration: 0.3 } },
        className: "group relative h-[450px] md:h-[600px]",
        style: { perspective: '1000px' },
        onClick: !isFlipped ? handleCardTap : handleBackClick,
        ref: cardRef
      };

  return (
    <CardWrapper {...wrapperProps}>
      <motion.div
        className="relative w-full h-full"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1]
        }}
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden border-2 shadow-2xl transition-shadow duration-300"
          style={{ 
            backfaceVisibility: 'hidden',
            borderColor: `${service.accent}60`,
          }}
          whileHover={{
            borderColor: `${service.accent}`,
            boxShadow: `0 20px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px ${service.accent}80`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated floating dots for non-flipped cards - on hover only */}
          {!isFlipped && [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-30 pointer-events-none"
              style={{
                backgroundColor: service.accent,
                top: `${30 + i * 20}%`,
                right: `${10 + (i % 2) * 5}%`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 8, 0],
                scale: [1, 1.3, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Subtle orbital dots for flipped cards - always visible */}
          {isFlipped && [...Array(5)].map((_, i) => {
            const angle = (i * 360 / 5); // Distribute evenly in circle
            const radius = 50; // Distance from center
            return (
              <motion.div
                key={`orbital-${i}`}
                className="absolute w-2 h-2 rounded-full opacity-20 pointer-events-none"
                style={{
                  backgroundColor: service.accent,
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((angle) * Math.PI / 180) * radius,
                    Math.cos((angle + 120) * Math.PI / 180) * radius,
                    Math.cos((angle + 240) * Math.PI / 180) * radius,
                    Math.cos((angle + 360) * Math.PI / 180) * radius,
                  ],
                  y: [
                    Math.sin((angle) * Math.PI / 180) * radius,
                    Math.sin((angle + 120) * Math.PI / 180) * radius,
                    Math.sin((angle + 240) * Math.PI / 180) * radius,
                    Math.sin((angle + 360) * Math.PI / 180) * radius,
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear"
                }}
              />
            );
          })}
          
          {/* Background Image with Noise Gradient Overlay */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={service.backgroundImage}
              alt={service.title}
              className="w-full h-full object-cover opacity-30"
            />
            
            {/* Noise gradient overlay from 100 to 0 */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(10, 10, 10, 1) 0%,
                    rgba(10, 10, 10, 0.98) 15%,
                    rgba(10, 10, 10, 0.95) 25%,
                    rgba(10, 10, 10, 0.85) 40%,
                    rgba(10, 10, 10, 0.7) 55%,
                    rgba(10, 10, 10, 0.5) 70%,
                    rgba(10, 10, 10, 0.3) 85%,
                    rgba(10, 10, 10, 0) 100%
                  )
                `,
              }}
            />
            
            {/* Additional noise texture overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />
            
            {/* Color tinted overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 70% 70%, ${service.accent} 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
            
            {/* Top Section - Icon */}
            <div className="flex justify-end mb-auto">
              <motion.div 
                className="p-4 md:p-5 rounded-2xl backdrop-blur-md border-2 shadow-lg"
                style={{
                  backgroundColor: `${service.accent}25`,
                  borderColor: `${service.accent}80`,
                  boxShadow: `0 0 30px ${service.accent}40`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#ECE7E1]" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Middle Section - Title & Description */}
            <div className="mb-6">
              {/* Accent line */}
              <motion.div 
                className="w-16 h-1 rounded-full mb-4"
                style={{ backgroundColor: service.accent }}
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              />
              
              <h3 
                className="font-['Josefin_Sans'] text-3xl md:text-4xl mb-3 tracking-tight"
                style={{ color: service.accent }}
              >
                {service.title}
              </h3>
              
              <p className="font-['Lato'] text-[#ECE7E1]/80 leading-relaxed text-sm md:text-base max-w-md">
                {service.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {service.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-3 py-1.5 rounded-full text-xs font-['Lato'] backdrop-blur-md border"
                  style={{
                    backgroundColor: `${service.accent}20`,
                    borderColor: `${service.accent}50`,
                    color: '#ECE7E1',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Bottom Section - CTA Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleButtonClick(e);
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              className="w-full py-4 rounded-xl font-['Lato'] inline-flex items-center justify-center gap-2 border-2 backdrop-blur-md group/btn overflow-hidden relative pointer-events-auto touch-none"
              style={{
                backgroundColor: `${service.accent}15`,
                borderColor: `${service.accent}60`,
                color: '#ECE7E1',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = service.accent;
                e.currentTarget.style.borderColor = service.accent;
                e.currentTarget.style.color = '#0A0A0A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${service.accent}15`;
                e.currentTarget.style.borderColor = `${service.accent}60`;
                e.currentTarget.style.color = '#ECE7E1';
              }}
            >
              <span className="text-sm md:text-base">Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Decorative Elements */}
          <div 
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
              boxShadow: `0 0 20px ${service.accent}80`,
            }}
          />
        </motion.div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border-2 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: `${service.accent}80`,
            background: `
              radial-gradient(circle at 20% 80%, ${service.accent}15 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${service.accent}10 0%, transparent 50%),
              #0A0A0A
            `,
          }}
        >
          {/* Noise overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
            
            {/* Header with icon */}
            <div className="relative mb-4 md:mb-6 flex-shrink-0">
              <motion.div 
                className="p-3 md:p-4 rounded-2xl inline-block"
                style={{ 
                  backgroundColor: `${service.accent}25`,
                  boxShadow: `0 0 40px ${service.accent}40`,
                }}
                animate={{ 
                  boxShadow: [
                    `0 0 40px ${service.accent}40`,
                    `0 0 60px ${service.accent}60`,
                    `0 0 40px ${service.accent}40`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="w-7 h-7 md:w-10 md:h-10" style={{ color: service.accent }} strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Services List - No scrolling */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {displayItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group/item relative"
                  >
                    <div className="flex items-start gap-3 p-3 md:p-4 rounded-xl backdrop-blur-sm border transition-all duration-300"
                      style={{
                        backgroundColor: `${service.accent}08`,
                        borderColor: `${service.accent}20`,
                      }}
                    >
                      <div 
                        className="mt-0.5 p-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${service.accent}30` }}
                      >
                        <Star className="w-3 h-3" style={{ color: service.accent }} fill={service.accent} />
                      </div>
                      
                      <span className="font-['Lato'] text-[#ECE7E1]/90 text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Back button - minimal bottom left */}
            <motion.div
              className="inline-flex items-center gap-3 relative group/btn cursor-pointer self-start mt-4 md:mt-6 flex-shrink-0 z-50 select-none"
              whileHover={{ 
                x: -5,
              }}
              whileTap={{ scale: 0.95 }}
              style={{ touchAction: 'manipulation' }}
            >
              <LessButton 
                accentColor={service.accent} 
                onFlip={() => onFlip(false)}
              />
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onFlip(false);
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                className="font-['Lato'] text-sm pointer-events-auto transition-all duration-300 touch-none"
                style={{
                  color: service.accent,
                }}
                whileHover={{
                  color: '#ECE7E1',
                }}
                aria-label="Flip back to front"
              >
                Flip Me Back
              </motion.button>
            </motion.div>

            {/* Corner decorations */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 rounded-bl-full opacity-5 pointer-events-none"
              style={{ backgroundColor: service.accent }}
            />
          </div>
        </div>
      </motion.div>
    </CardWrapper>
  );
}

// Desktop compact card component
function CompactServiceCard({ 
  service, 
  index, 
  isSelected, 
  onClick 
}: CompactServiceCardProps) {
  const Icon = service.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full text-left overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 group cursor-pointer"
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${service.accent}15, ${service.accent}08)`
          : 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'transparent',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      {/* Animated floating dots for non-selected cards - on hover only */}
      {!isSelected && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full opacity-0 group-hover:opacity-30 pointer-events-none"
          style={{
            backgroundColor: service.accent,
            top: `${30 + i * 20}%`,
            right: `${5 + (i % 2) * 3}%`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
            scale: [1, 1.3, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Subtle orbital dots for selected cards - always visible */}
      {isSelected && [...Array(5)].map((_, i) => {
        const angle = (i * 360 / 5); // Distribute evenly in circle
        const radius = 40; // Distance from center
        return (
          <motion.div
            key={`orbital-${i}`}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full opacity-20 pointer-events-none"
            style={{
              backgroundColor: service.accent,
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [
                Math.cos((angle) * Math.PI / 180) * radius,
                Math.cos((angle + 120) * Math.PI / 180) * radius,
                Math.cos((angle + 240) * Math.PI / 180) * radius,
                Math.cos((angle + 360) * Math.PI / 180) * radius,
              ],
              y: [
                Math.sin((angle) * Math.PI / 180) * radius,
                Math.sin((angle + 120) * Math.PI / 180) * radius,
                Math.sin((angle + 240) * Math.PI / 180) * radius,
                Math.sin((angle + 360) * Math.PI / 180) * radius,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear"
            }}
          />
        );
      })}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 md:gap-4">
        {/* Icon */}
        <div 
          className="p-2 md:p-3 rounded-lg md:rounded-xl flex-shrink-0 transition-all duration-300"
          style={{
            backgroundColor: isSelected ? `${service.accent}30` : `${service.accent}15`,
            boxShadow: isSelected ? `0 0 20px ${service.accent}40` : 'none',
          }}
        >
          <Icon 
            className="w-5 h-5 md:w-6 md:h-6" 
            style={{ color: service.accent }} 
            strokeWidth={1.5} 
          />
        </div>
        
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 
            className="font-['Josefin_Sans'] text-lg md:text-xl mb-0.5 md:mb-1 transition-colors duration-300"
            style={{ color: isSelected ? service.accent : '#ECE7E1' }}
          >
            {service.title}
          </h3>
          <p className="font-['Lato'] text-[#ECE7E1]/60 text-xs md:text-sm line-clamp-1">
            {service.description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <ChevronRight 
          className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-all duration-300" 
          style={{ 
            color: service.accent,
            opacity: isSelected ? 1 : 0.3,
            transform: isSelected ? 'translateX(0)' : 'translateX(-4px)'
          }} 
        />
      </div>
    </motion.button>
  );
}

// Desktop details panel component
function DetailsPanel({ service }: { service: CreativeService }) {
  const Icon = service.icon;
  
  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col"
    >
      {/* Portfolio Section - Horizontal Layout */}
      <div className="mb-6 md:mb-8 flex-shrink-0">
        <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] text-lg md:text-xl mb-3 md:mb-4">
          Featured Work
        </h4>
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 h-[180px] md:h-[300px]">
          {/* First portfolio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden border group/work cursor-pointer"
            style={{
              borderColor: `${service.accent}30`,
            }}
          >
            <ImageWithFallback
              src={service.portfolioImages[0]}
              alt={`${service.title} portfolio 1`}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, ${service.accent}90 100%)`,
              }}
            />
            
            {/* Accent border glow on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `inset 0 0 30px ${service.accent}60`,
              }}
            />
          </motion.div>
          
          {/* Second portfolio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden border group/work cursor-pointer"
            style={{
              borderColor: `${service.accent}30`,
            }}
          >
            <ImageWithFallback
              src={service.portfolioImages[1]}
              alt={`${service.title} portfolio 2`}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, ${service.accent}90 100%)`,
              }}
            />
            
            {/* Accent border glow on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `inset 0 0 30px ${service.accent}60`,
              }}
            />
          </motion.div>
          
          {/* Third portfolio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden border group/work cursor-pointer"
            style={{
              borderColor: `${service.accent}30`,
            }}
          >
            <ImageWithFallback
              src={service.portfolioImages[2]}
              alt={`${service.title} portfolio 3`}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, ${service.accent}90 100%)`,
              }}
            />
            
            {/* Accent border glow on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `inset 0 0 30px ${service.accent}60`,
              }}
            />
          </motion.div>
          
          {/* Fourth portfolio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden border group/work cursor-pointer"
            style={{
              borderColor: `${service.accent}30`,
            }}
          >
            <ImageWithFallback
              src={service.portfolioImages[3]}
              alt={`${service.title} portfolio 4`}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, ${service.accent}90 100%)`,
              }}
            />
            
            {/* Accent border glow on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `inset 0 0 30px ${service.accent}60`,
              }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Glassy Frame Container for Lower Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative -ml-[calc((100vw-1400px)/2+1.5rem)] md:-ml-[calc(50%+3rem)] rounded-3xl overflow-visible"
      >
        {/* Top border line extending edge-to-edge */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-40"
          style={{
            width: '100vw',
            height: '2px',
            top: 0,
            background: `linear-gradient(90deg, transparent 0%, ${service.accent}40 10%, ${service.accent}40 90%, transparent 100%)`,
            boxShadow: `0 0 20px ${service.accent}30`,
          }}
        />
        
        {/* Bottom border line extending edge-to-edge */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-40"
          style={{
            width: '100vw',
            height: '2px',
            bottom: 0,
            background: `linear-gradient(90deg, transparent 0%, ${service.accent}40 10%, ${service.accent}40 90%, transparent 100%)`,
            boxShadow: `0 0 20px ${service.accent}30`,
          }}
        />
        
        {/* Animated Dots extending edge-to-edge */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-15 overflow-visible"
          style={{
            width: '100vw',
            height: '100%',
            top: 0,
          }}
        >
          {[...Array(120)].map((_, i) => {
            const size = [4, 6, 8, 10, 12][i % 5];
            const xPos = (i * 47) % 100;
            const yPos = (i * 73) % 100;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: service.accent,
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                  opacity: 0.3,
                }}
                animate={{
                  y: [0, -20, 0, 15, 0],
                  x: [0, 10, -5, 8, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  opacity: [0.2, 0.4, 0.25, 0.35, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
        
        {/* Glassy Frame */}
        <div 
          className="relative overflow-hidden"
        >

          {/* Left Side - Image stuck to top */}
          {service.leadImage ? (
            <LeadImageFrame image={service.leadImage} accent={service.accent} title={service.title} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -left-8 top-0 w-[380px] h-[520px] md:w-[460px] md:h-[600px] z-20 pointer-events-none"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
              }}
            >
              <Group1000001851 color={service.accent} />
            </motion.div>
          )}

          {/* Content Area */}
          <div className="relative z-30 pl-[470px] md:pl-[590px] pr-8 py-8">
            {/* Header */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div 
                  className="p-2 md:p-4 rounded-lg md:rounded-xl"
                  style={{
                    backgroundColor: `${service.accent}20`,
                    boxShadow: `0 0 30px ${service.accent}30`,
                  }}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: service.accent }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 
                    className="font-['Josefin_Sans'] text-xl md:text-3xl mb-0.5 md:mb-1"
                    style={{ color: service.accent }}
                  >
                    {service.title}
                  </h3>
                  <p className="font-['Lato'] text-[#ECE7E1]/70 text-xs md:text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {service.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-2.5 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-['Lato']"
                    style={{
                      backgroundColor: `${service.accent}15`,
                      borderWidth: '1px',
                      borderColor: `${service.accent}40`,
                      color: '#ECE7E1',
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Services List - 2 Columns */}
            <div className="flex-1 min-h-0">
              <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] text-lg md:text-xl mb-3 md:mb-4">
                {service.details.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {service.details.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-2 p-2 md:p-2.5 rounded-lg transition-all duration-300 group/item"
                    style={{
                      backgroundColor: 'rgba(30, 30, 30, 0.7)',
                      borderWidth: '1px',
                      borderColor: `${service.accent}20`,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <div 
                      className="mt-0.5 p-0.5 md:p-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `${service.accent}30` }}
                    >
                      <Star className="w-2 h-2 md:w-2.5 md:h-2.5" style={{ color: service.accent }} fill={service.accent} />
                    </div>
                    <span className="font-['Lato'] text-[#ECE7E1]/80 text-[10px] md:text-xs leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Top accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-0.5 z-40"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
              boxShadow: `0 0 20px ${service.accent}80`,
            }}
          />

          {/* Bottom accent line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-0.5 z-40"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
              boxShadow: `0 0 20px ${service.accent}80`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CreativeServices() {
  const { t } = useLanguage();
  const creativeServices = getCreativeServices(t);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: false,
    dragFree: true,
    skipSnaps: false,
    axis: 'x',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  // On mobile start closed, on desktop start with first card open
  const [selectedService, setSelectedService] = useState(0);
  const [portfolioScrollPositions, setPortfolioScrollPositions] = useState<{ [key: number]: number }>({});

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    setSelectedService(prev => (prev < 0 ? newIndex : prev));
    
    // Flip back all cards except the current one
    setFlippedCards(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (parseInt(key) !== newIndex) {
          updated[parseInt(key)] = false;
        }
      });
      return updated;
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleFlip = (index: number, flipped: boolean) => {
    setFlippedCards(prev => ({ ...prev, [index]: flipped }));
  };

  return (
    <motion.section 
      id="creative" 
      className="relative py-8 md:py-12 bg-[#0A0A0A]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <div className="inline-block px-3 py-1.5 md:px-5 md:py-2 mb-4 md:mb-6 rounded-full bg-[#7F2C4C]/10 border border-[#7F2C4C]/30">
            <span className="font-['Lato'] text-[#7F2C4C] text-xs md:text-sm tracking-wide">CREATIVE SERVICES</span>
          </div>

          <h2 className="font-['Josefin_Sans'] text-[#ECE7E1] text-[clamp(32px,7vw,80px)] leading-tight tracking-tight mb-4 md:mb-6">
            Make Them<br />
            <span style={{
              background: 'linear-gradient(135deg, #7F2C4C 0%, #A84CB4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '"Luckiest Guy", cursive'
            }}>
              Remember You
            </span>
          </h2>
        </motion.div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden space-y-3">
          {creativeServices.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = selectedService === index;
            
            return (
              <div key={service.title}>
                {/* Service Button */}
                <motion.button
                  onClick={() => {
                    if (!isExpanded) {
                      setSelectedService(index);
                    }
                  }}
                  className="relative w-full text-left overflow-hidden rounded-xl p-4 group cursor-pointer"
                  style={{
                    background: isExpanded 
                      ? `linear-gradient(135deg, ${service.accent}15, ${service.accent}08)`
                      : 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: isExpanded ? service.accent : `${service.accent}30`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Animated floating dots for non-expanded cards */}
                  {!isExpanded && [...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full opacity-20 pointer-events-none"
                      style={{
                        backgroundColor: service.accent,
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
                  
                  {/* Subtle orbital dots for expanded cards - always visible */}
                  {isExpanded && [...Array(5)].map((_, i) => {
                    const angle = (i * 360 / 5);
                    const radius = 35;
                    return (
                      <motion.div
                        key={`orbital-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full opacity-20 pointer-events-none"
                        style={{
                          backgroundColor: service.accent,
                          left: '50%',
                          top: '50%',
                        }}
                        animate={{
                          x: [
                            Math.cos((angle) * Math.PI / 180) * radius,
                            Math.cos((angle + 120) * Math.PI / 180) * radius,
                            Math.cos((angle + 240) * Math.PI / 180) * radius,
                            Math.cos((angle + 360) * Math.PI / 180) * radius,
                          ],
                          y: [
                            Math.sin((angle) * Math.PI / 180) * radius,
                            Math.sin((angle + 120) * Math.PI / 180) * radius,
                            Math.sin((angle + 240) * Math.PI / 180) * radius,
                            Math.sin((angle + 360) * Math.PI / 180) * radius,
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "linear"
                        }}
                      />
                    );
                  })}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    {/* Icon */}
                    <div 
                      className="p-2.5 rounded-lg flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isExpanded ? `${service.accent}30` : `${service.accent}15`,
                        boxShadow: isExpanded ? `0 0 20px ${service.accent}40` : 'none',
                      }}
                    >
                      <Icon 
                        className="w-5 h-5" 
                        style={{ color: service.accent }} 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-['Josefin_Sans'] text-lg mb-0.5 transition-colors duration-300"
                        style={{ color: isExpanded ? service.accent : '#ECE7E1' }}
                      >
                        {service.title}
                      </h3>
                      <p className="font-['Lato'] text-[#ECE7E1]/60 text-xs line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Arrow indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight 
                        className="w-5 h-5 flex-shrink-0 transition-all duration-300" 
                        style={{ 
                          color: service.accent,
                          opacity: isExpanded ? 1 : 0.5,
                        }} 
                      />
                    </motion.div>
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
                      <div className="pt-4 pb-2 space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 px-2">
                          {service.tags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="px-3 py-1.5 rounded-full text-xs font-['Lato']"
                              style={{
                                backgroundColor: `${service.accent}15`,
                                borderWidth: '1px',
                                borderColor: `${service.accent}40`,
                                color: '#ECE7E1',
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* What We Do */}
                        <div className="px-2">
                          <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] text-base mb-3">
                            {service.details.title}
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {service.details.items.map((item, i) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="flex items-start gap-2 p-2.5 rounded-lg"
                                style={{
                                  backgroundColor: `${service.accent}05`,
                                  borderWidth: '1px',
                                  borderColor: `${service.accent}15`,
                                }}
                              >
                                <div 
                                  className="mt-0.5 p-1 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: `${service.accent}30` }}
                                >
                                  <Star className="w-2.5 h-2.5" style={{ color: service.accent }} fill={service.accent} />
                                </div>
                                <span className="font-['Lato'] text-[#ECE7E1]/80 text-xs leading-relaxed">
                                  {item}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Campaign Portfolio */}
                        <div className="px-2">
                          <h4 className="font-['Josefin_Sans'] text-[#ECE7E1] text-base mb-3">
                            Portfolio Showcase
                          </h4>
                          <div 
                            className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
                            onScroll={(e: UIEvent<HTMLDivElement>) => {
                              const target = e.target as HTMLDivElement;
                              const scrollLeft = target.scrollLeft;
                              const scrollWidth = target.scrollWidth - target.clientWidth;
                              const scrollPercentage = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
                              setPortfolioScrollPositions(prev => ({ ...prev, [index]: scrollPercentage }));
                            }}
                          >
                            {service.portfolioImages.map((image, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="relative aspect-square rounded-lg overflow-hidden border group/work cursor-pointer flex-shrink-0 w-[45%] snap-start"
                                style={{
                                  borderColor: `${service.accent}30`,
                                }}
                              >
                                <ImageWithFallback
                                  src={image}
                                  alt={`${service.title} portfolio ${i + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                
                                {/* Hover overlay */}
                                <div 
                                  className="absolute inset-0 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"
                                  style={{
                                    background: `linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, ${service.accent}90 100%)`,
                                  }}
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Scroll Progress Indicator */}
                          <div className="flex justify-center gap-1.5 mt-3 px-2">
                            {service.portfolioImages.map((_, i) => {
                              const scrollPos = portfolioScrollPositions[index] || 0;
                              const totalImages = service.portfolioImages.length;
                              const segmentSize = 1 / (totalImages - 1);
                              const currentSegment = Math.round(scrollPos / segmentSize);
                              const isActive = i === currentSegment;
                              
                              return (
                                <div
                                  key={i}
                                  className="h-0.5 rounded-full transition-all duration-300"
                                  style={{
                                    width: isActive ? '16px' : '8px',
                                    backgroundColor: isActive ? service.accent : `${service.accent}30`,
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>
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
          {/* Left Side - Service Cards */}
          <div className="col-span-12 md:col-span-4 space-y-3 md:space-y-4">
            {creativeServices.map((service, index) => (
              <CompactServiceCard
                key={service.title}
                service={service}
                index={index}
                isSelected={selectedService === index}
                onClick={() => {
                  if (selectedService !== index) {
                    setSelectedService(index);
                  }
                }}
              />
            ))}
          </div>
          
          {/* Right Side - Details Panel with Portfolio */}
          <div className="col-span-12 md:col-span-8">
            <div className="md:sticky md:top-24 md:h-[calc(100vh-12rem)]">
              <AnimatePresence mode="wait">
                {selectedService >= 0 && selectedService < creativeServices.length && (
                  <DetailsPanel service={creativeServices[selectedService]} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}