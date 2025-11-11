import React, { useRef, useCallback } from 'react';

/**
 * Unified touch handler for mobile card buttons
 * Ensures consistent behavior across iOS and Android
 */
export function useMobileCardTouchHandler(
  onToggle: () => void,
  isExpanded: boolean
) {
  const touchStateRef = useRef({
    touchStartY: 0,
    touchStartX: 0,
    touchStartTime: 0,
    touchMoved: false,
    isTracking: false,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    // Only track touches on the button itself
    const touch = e.touches[0];
    if (touch) {
      touchStateRef.current.touchStartY = touch.clientY;
      touchStateRef.current.touchStartX = touch.clientX;
      touchStateRef.current.touchStartTime = Date.now();
      touchStateRef.current.touchMoved = false;
      touchStateRef.current.isTracking = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    // CRITICAL: Don't interfere with scrolling at all
    // If user is moving their finger, it's a scroll - stop tracking immediately
    if (!touchStateRef.current.isTracking) return;
    
    const touch = e.touches[0];
    if (touch) {
      const deltaY = Math.abs(touch.clientY - touchStateRef.current.touchStartY);
      const deltaX = Math.abs(touch.clientX - touchStateRef.current.touchStartX);
      
      // Very low threshold - any movement means scroll, stop tracking
      // This ensures scrolling is never blocked
      if (deltaY > 3 || deltaX > 3) {
        touchStateRef.current.touchMoved = true;
        // Immediately stop tracking to allow native scroll - don't block it
        touchStateRef.current.isTracking = false;
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    // Only process if we're still tracking (no movement detected)
    if (!touchStateRef.current.isTracking) {
      // Reset state and allow scroll to continue
      touchStateRef.current.isTracking = false;
      touchStateRef.current.touchStartTime = 0;
      touchStateRef.current.touchMoved = false;
      return;
    }
    
    const state = touchStateRef.current;
    const touch = e.changedTouches[0];
    
    if (touch && state.touchStartTime > 0) {
      const timeDiff = Date.now() - state.touchStartTime;
      const deltaY = Math.abs(touch.clientY - state.touchStartY);
      const deltaX = Math.abs(touch.clientX - state.touchStartX);
      
      // CRITICAL: When expanded, be EXTREMELY strict - only close on perfect tap
      // When collapsed, be more lenient to allow easy opening
      const maxMovement = isExpanded ? 5 : 10;
      const maxTime = isExpanded ? 200 : 350;
      
      // Only consider it a tap if:
      // 1. No movement detected at all
      // 2. Very quick (<200ms when expanded, <350ms when collapsed)
      // 3. Minimal movement (<5px when expanded, <10px when collapsed)
      const isPerfectTap = !state.touchMoved && 
                          timeDiff < maxTime && 
                          deltaY < maxMovement && 
                          deltaX < maxMovement;
      
      if (isPerfectTap) {
        // This is a perfect tap - toggle the card
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }
      // If not a perfect tap, do nothing - allow scrolling to continue
    }
    
    // Reset state
    touchStateRef.current.isTracking = false;
    touchStateRef.current.touchStartTime = 0;
    touchStateRef.current.touchMoved = false;
  }, [onToggle, isExpanded]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Only handle mouse clicks (not touch events that fire click)
    // Touch events are handled separately
    if ((e as any).pointerType === 'mouse') {
      e.preventDefault();
      e.stopPropagation();
      onToggle();
    }
  }, [onToggle]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClick,
    // Touch action: 
    // - When expanded: allow pan-y and pan-x for scrolling (don't block any scroll gestures)
    // - When collapsed: use manipulation (prevents double-tap zoom, allows single tap)
    touchAction: isExpanded ? 'pan-y pan-x' : 'manipulation',
  };
}

