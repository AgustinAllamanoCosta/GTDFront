import { useEffect, useState } from 'react';
import { breakpoint } from '../constants/size';

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    setIsMobile(width < breakpoint);
  }, [width]);

  return { width, isMobile };
};
