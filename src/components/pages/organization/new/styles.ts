import { shadows } from '@/styles/variables';
import { css } from '@emotion/react';

export const containerCss = css`
  width: 500px;
  height: 350px;
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
