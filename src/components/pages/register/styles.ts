import { shadows } from '@/styles/variables';
import { css } from '@emotion/react';

export const pageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75vh;
`;

export const containerCss = css`
  width: 500px;
  height: auto;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background: var(--muted);
  border-radius: var(--border-radius);
  box-shadow: ${shadows.black.md};
  text-align: center;
`;

export const titleCss = css`
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
  color: var(--foreground);
`;

export const formCss = css`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;
