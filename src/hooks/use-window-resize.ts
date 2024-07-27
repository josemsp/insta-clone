import { useState, useEffect } from 'react';

interface UseWindowResizeOptions {
  debounce?: boolean;
  debounceDelay?: number;
}

const useWindowResize = ({ debounce = false, debounceDelay = 200 }: UseWindowResizeOptions = {}) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleResize = () => {
      if (debounce) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }, debounceDelay);
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial call to set the size on mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debounce, debounceDelay]);

  return windowSize;
};

export default useWindowResize;
