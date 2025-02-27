import { css } from '@emotion/react';

import { colors } from '@/styles/variables';

export const backgroundStyles = css`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;

  .light-animation {
    position: absolute;
    inset: 0;
    opacity: 0;
    background: linear-gradient(
      45deg,
      ${colors.background.light} 0%,
      ${colors.primary.light}10 20%,
      ${colors.primary.light}10 20%,
      ${colors.accent.purple}05 30%,
      ${colors.accent.cyan}05 50%,
      ${colors.accent.yellow}05 70%,
      ${colors.background.light} 100%
    );
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    transition: opacity 1s ease-out;
    visibility: hidden;
    mix-blend-mode: soft-light;

    &.mounted {
      visibility: visible;
    }

    &.active {
      opacity: 0.5;
    }
  }

  @keyframes gradientBG {
    0% {
      background-position: 0% 0%;
      opacity: 0.1;
    }
    25% {
      background-position: 100% 0%;
      opacity: 0.2;
    }
    50% {
      background-position: 100% 100%;
      opacity: 0.1;
    }
    75% {
      background-position: 0% 100%;
      opacity: 0.2;
    }
    100% {
      background-position: 0% 0%;
      opacity: 0.1;
    }
  }

  .spotlight {
    position: fixed;
    width: 60vmax;
    height: 60vmax;
    top: -30vmax;
    left: -30vmax;
    opacity: 0;
    background: radial-gradient(
      circle at center,
      ${colors.primary.dark}25,
      ${colors.secondary.dark}15,
      transparent 90%
    );
    mix-blend-mode: screen;
    filter: blur(60px);
    will-change: transform;
    transition: all 0.4s ease-out;
    transform: translate(0, 0);
    visibility: hidden;

    &.mounted {
      visibility: visible;
    }

    &.active {
      opacity: 0.7;
    }
  }

  .glow {
    position: fixed;
    width: 40vmax;
    height: 40vmax;
    top: -20vmax;
    left: -20vmax;
    opacity: 0;
    background: radial-gradient(
      circle at center,
      ${colors.accent.purple}15,
      ${colors.accent.cyan}10,
      transparent 85%
    );
    mix-blend-mode: screen;
    filter: blur(50px);
    will-change: transform;
    transition: all 0.4s ease-out;
    transform: translate(0, 0);
    visibility: hidden;

    &.mounted {
      visibility: visible;
    }

    &.active {
      opacity: 0.6;
    }
  }
`;
