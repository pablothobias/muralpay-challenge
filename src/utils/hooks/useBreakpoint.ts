import { useEffect, useState } from 'react';

export const breakpoints = {
  xsMobile: 300,
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export type BreakpointState = {
  isXsMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentBreakpoint: Breakpoint;
};

export const useBreakpoint = (): BreakpointState => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : breakpoints.desktop,
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentBreakpoint: Breakpoint =
    windowWidth <= breakpoints.mobile
      ? 'mobile'
      : windowWidth <= breakpoints.tablet
        ? 'tablet'
        : windowWidth <= breakpoints.laptop
          ? 'laptop'
          : 'desktop';

  return {
    isXsMobile: windowWidth <= breakpoints.xsMobile,
    isMobile: windowWidth <= breakpoints.mobile,
    isTablet: windowWidth > breakpoints.mobile && windowWidth <= breakpoints.tablet,
    isDesktop: windowWidth > breakpoints.tablet,
    currentBreakpoint,
  };
};
