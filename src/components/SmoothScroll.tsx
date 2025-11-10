import { useEffect } from 'react';

// Custom easing function for smooth, slow scrolling
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SmoothScroll() {
  useEffect(() => {
    let isScrolling = false;
    let rafId: number | null = null;

    // Enhanced smooth scroll function with custom easing
    function smoothScrollTo(target: number, duration: number = 1200) {
      if (isScrolling && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        isScrolling = false;
      }

      isScrolling = true;
      const startY = window.scrollY;
      const distance = target - startY;
      const startTime = performance.now();

      function scroll(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        const nextPosition = startY + distance * eased;
        
        originalScrollTo.call(window, 0, nextPosition);

        if (progress < 1) {
          rafId = requestAnimationFrame(scroll);
        } else {
          rafId = null;
          isScrolling = false;
        }
      }

      rafId = requestAnimationFrame(scroll);
    }

    // Handle anchor link clicks with enhanced smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop - 100; // Offset for header
            
            smoothScrollTo(targetPosition, 1400); // Slower, smoother scroll
          }
        } else if (href === '#') {
          smoothScrollTo(0, 1200);
        }
      }
    };

    // Handle button clicks that might trigger scrolling
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      
      // Check if button has an onClick that might scroll
      if (button && button.hasAttribute('data-scroll-to')) {
        e.preventDefault();
        const scrollTarget = button.getAttribute('data-scroll-to');
        if (scrollTarget) {
          const element = document.getElementById(scrollTarget);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop - 100;
            
            smoothScrollTo(targetPosition, 1400);
          }
        }
      }
    };

    // Intercept scrollIntoView calls
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(arg?: boolean | ScrollIntoViewOptions) {
      const rect = this.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - 100;
      
      smoothScrollTo(targetPosition, 1400);
    };

    // Intercept window.scrollTo calls
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(x: number | ScrollToOptions, y?: number) {
      if (typeof x === 'object' && x !== null) {
        const options = x as ScrollToOptions;
        if (options.behavior === 'smooth') {
          const targetY = options.top || 0;
          smoothScrollTo(targetY, 1400);
          return;
        }
      } else if (typeof x === 'number' && typeof y === 'number') {
        smoothScrollTo(y, 1200);
        return;
      }
      originalScrollTo.call(window, x, y);
    };

    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('click', handleButtonClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('click', handleButtonClick);
      
      // Restore original functions
      Element.prototype.scrollIntoView = originalScrollIntoView;
      window.scrollTo = originalScrollTo;
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
