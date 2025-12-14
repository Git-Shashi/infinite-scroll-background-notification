import { useEffect, useRef } from 'react';

/**
 * Hook for Intersection Observer
 * Triggers callback when element becomes visible
 */
export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [enabled, onIntersect, threshold, rootMargin]);

  return targetRef;
};
