import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(max-width: 1024px)');

    const handler = () => {
      setIsSmallScreen(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
    };

    mobileQuery.addEventListener('change', handler);
    tabletQuery.addEventListener('change', handler);
    handler();

    return () => {
      mobileQuery.removeEventListener('change', handler);
      tabletQuery.removeEventListener('change', handler);
    };
  }, []);

  return { isSmallScreen, isTablet };
};
