import { useEffect } from 'react';

// Custom easing function for smooth, slow scrolling
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SmoothScroll() {
  useEffect(() => {
    let isScrolling = false;
    let rafId: number | null = null;
    let isUserScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    // Store original scroll functions before overriding
    const originalScrollTo = window.scrollTo;
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    // Detect if user is actively scrolling (touch/mouse wheel)
    const handleUserScrollStart = () => {
      isUserScrolling = true;
      // Cancel any programmatic smooth scroll if user starts scrolling
      if (isScrolling && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        isScrolling = false;
      }
      // Clear the flag after user stops scrolling
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 150);
    };

    // Enhanced smooth scroll function with custom easing
    function smoothScrollTo(target: number, duration: number = 1200) {
      // Don't interrupt if user is actively scrolling on mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile && isUserScrolling) {
        return;
      }

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
        // Stop if user starts scrolling
        if (isUserScrolling && window.innerWidth < 768) {
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
          }
          rafId = null;
          isScrolling = false;
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        const nextPosition = startY + distance * eased;
        
        // Use the original scrollTo for programmatic scrolling within our smooth scroll
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

    // Intercept scrollIntoView calls - only for smooth behavior
    Element.prototype.scrollIntoView = function(arg?: boolean | ScrollIntoViewOptions) {
      // Only intercept if smooth behavior is explicitly requested
      if (typeof arg === 'object' && arg?.behavior === 'smooth') {
        const rect = this.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 100;
        smoothScrollTo(targetPosition, 1400);
      } else {
        // Use native implementation for instant scrolls or default behavior
        originalScrollIntoView.call(this, arg);
      }
    };

    // Intercept window.scrollTo calls - only for smooth behavior
    window.scrollTo = function(x: number | ScrollToOptions, y?: number) {
      // Only intercept smooth scrolls, let instant scrolls use native behavior
      if (typeof x === 'object' && x !== null) {
        const options = x as ScrollToOptions;
        if (options.behavior === 'smooth') {
          const targetY = options.top ?? window.scrollY;
          smoothScrollTo(targetY, 1400);
          return;
        }
      }
      // For number arguments, use native (instant) scroll - don't intercept
      // This allows native touch scrolling to work properly
      originalScrollTo.call(window, x, y);
    };

    // Listen for user scroll events to detect active scrolling
    const handleScroll = () => {
      handleUserScrollStart();
    };

    // Use wheel and touch events to detect user-initiated scrolling
    window.addEventListener('wheel', handleUserScrollStart, { passive: true });
    window.addEventListener('touchmove', handleUserScrollStart, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('click', handleButtonClick);

    return () => {
      window.removeEventListener('wheel', handleUserScrollStart);
      window.removeEventListener('touchmove', handleUserScrollStart);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('click', handleButtonClick);
      
      // Restore original functions
      Element.prototype.scrollIntoView = originalScrollIntoView;
      window.scrollTo = originalScrollTo;
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return null;
}
