import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { backgroundStyles } from './styles';
import useThemeStore from '@/store/theme';
import { ThemeType } from '@/store/theme/types';

const ANIMATION_CLEANUP_DELAY = 300;

const BackgroundAnimation = memo(() => {
  const rafRef = useRef<number>();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lightAnimationRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);
  const [theme, setTheme] = useState<ThemeType>(() => useThemeStore.getState().theme);
  const isDarkTheme = theme === 'dark';

  const activateAnimation = useCallback(() => {
    if (isDarkTheme) {
      if (!spotlightRef.current || !glowRef.current) return;
      spotlightRef.current.classList.add('active');
      glowRef.current.classList.add('active');
    } else {
      if (!lightAnimationRef.current) return;
      lightAnimationRef.current.classList.add('active');
    }
    isActiveRef.current = true;
  }, [isDarkTheme]);

  const deactivateAnimation = useCallback(() => {
    if (isDarkTheme) {
      if (!spotlightRef.current || !glowRef.current) return;

      spotlightRef.current.classList.remove('active');
      glowRef.current.classList.remove('active');
    } else {
      if (!lightAnimationRef.current) return;

      lightAnimationRef.current.classList.remove('active');
    }

    isActiveRef.current = false;
  }, [isDarkTheme]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (isDarkTheme) {
          if (!spotlightRef.current || !glowRef.current) return;

          const transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          spotlightRef.current.style.transform = transform;
          glowRef.current.style.transform = transform;
        }

        if (!isActiveRef.current) {
          activateAnimation();
        }
      });
    },
    [isDarkTheme, activateAnimation],
  );

  useEffect(() => {
    const unsubscribe = useThemeStore.subscribe(
      (state) => state.theme,
      (newTheme) => {
        deactivateAnimation();
        setTheme(newTheme);
        isActiveRef.current = false;

        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = undefined;
        }
      },
    );

    return () => {
      unsubscribe();
      deactivateAnimation();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [deactivateAnimation]);

  const handleMouseLeave = useCallback(() => {
    setTimeout(deactivateAnimation, ANIMATION_CLEANUP_DELAY);
  }, [deactivateAnimation]);

  useEffect(() => {
    const cleanupRaf = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cleanupRaf();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      deactivateAnimation();
    };
  }, [handleMouseMove, handleMouseLeave, deactivateAnimation]);

  return (
    <div css={backgroundStyles}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
      {!isDarkTheme ? (
        <div
          ref={lightAnimationRef}
          className={`light-animation mounted${isActiveRef.current ? ' active' : ''}`}
          style={{
            background: `linear-gradient(
              45deg,
              red,
              blue,
              green
            )`,
            opacity: isActiveRef.current ? 0.3 : 0,
          }}
        />
      ) : (
        <>
          <div
            ref={spotlightRef}
            className={`spotlight mounted${isActiveRef.current ? ' active' : ''}`}
          />
          <div ref={glowRef} className={`glow mounted${isActiveRef.current ? ' active' : ''}`} />
        </>
      )}
    </div>
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';

export default BackgroundAnimation;
