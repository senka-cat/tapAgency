import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Section colors
  const sectionColors: Record<string, string> = {
    hero: 'rgb(168, 21, 113)', // Pink
    creative: 'rgb(127, 44, 76)', // Burgundy
    marketing: 'rgb(179, 193, 154)', // Sage green
    contact: 'rgb(168, 76, 180)', // Lavender
    blog: 'rgb(179, 193, 154)', // Sage green
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, [role="button"], input, textarea, select');
      setIsHovering(!!isClickable);
    };

    const handleScroll = () => {
      const sections = ['hero', 'creative', 'marketing', 'blog', 'contact'];
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cursorX, cursorY]);

  const currentColor = sectionColors[currentSection] || sectionColors.hero;
  const hoverColor = 'rgb(179, 193, 154)'; // Sage green for hover state
  const displayColor = isHovering ? hoverColor : currentColor;

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-[9999]">
      {/* Main cursor dot - no spring, instant movement */}
      <motion.div
        className="absolute rounded-full mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
          width: '12px',
          height: '12px',
          backgroundColor: displayColor,
        }}
      />

      {/* Following dots with delays - keep spring for trail effect */}
      {[0, 1, 2, 3, 4].map((index) => {
        const size = 10 - index * 1.5;
        const opacity = 0.8 - index * 0.13;

        const dotXSpring = useSpring(cursorX, {
          damping: 35 - index * 3,
          stiffness: 250 - index * 25,
        });
        const dotYSpring = useSpring(cursorY, {
          damping: 35 - index * 3,
          stiffness: 250 - index * 25,
        });

        return (
          <motion.div
            key={index}
            className="absolute rounded-full mix-blend-difference"
            style={{
              left: dotXSpring,
              top: dotYSpring,
              x: '-50%',
              y: '-50%',
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              backgroundColor: displayColor,
            }}
          />
        );
      })}

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border-2 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
          width: '32px',
          height: '32px',
          borderColor: displayColor,
          opacity: 0.4,
        }}
      />
    </div>
  );
}
