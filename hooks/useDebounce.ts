import { useCallback, useRef } from 'react';

// Define a generic type for the callback function that accepts any arguments and returns any type
type CallbackFunction = (...args: any[]) => void;

// Custom debounce hook in TypeScript
function useDebounce(callback: CallbackFunction, delay: number) {
  // Use a mutable reference object that does not cause a re-render when changed
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Create a debounced version of the callback using useCallback
  const debouncedCallback = useCallback(
    (...args: any[]) => {
      // Clear the existing timer if there is one
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a new timer with the specified delay
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export default useDebounce;
