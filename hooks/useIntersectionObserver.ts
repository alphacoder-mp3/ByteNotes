import { useEffect, useRef, MutableRefObject } from 'react';

export function useIntersectionObserver(
  callback: () => void
): MutableRefObject<IntersectionObserver | null> {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    return () => observerRef.current?.disconnect();
  }, [callback]);

  return observerRef;
}
