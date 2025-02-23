import { createContext, useContext, type PropsWithChildren } from 'react';
import { useBreakpoint, type BreakpointState } from '../hooks/useBreakpoint';

const ResponsiveContext = createContext<BreakpointState | null>(null);

export const ResponsiveProvider = ({ children }: PropsWithChildren) => {
  const breakpoint = useBreakpoint();

  return <ResponsiveContext.Provider value={breakpoint}>{children}</ResponsiveContext.Provider>;
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
