import { css, keyframes } from '@emotion/react';

import { colors, spacing, typography } from '@/styles/variables';

const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const transferCardCss = css`
  position: relative;
  display: flex;
  background: ${colors.background.light};
  flex-direction: column;
  gap: ${spacing.md};
  border-radius: 12px;
  border: 1px solid ${colors.neutral[200]};
  padding: ${spacing.lg};
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.primary.light}, ${colors.secondary.light});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`;

export const recipientCardCss = css`
  background: ${colors.background.light};
  border-radius: 8px;
  padding: ${spacing.md};
  border: 1px solid ${colors.neutral[100]};
  display: grid;
  gap: ${spacing.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${scaleIn} 0.3s ease-out;
  background: ${colors.background.light};
  border-radius: 8px;
  padding: ${spacing.md};
  border: 1px solid ${colors.neutral[100]};
  display: grid;
  gap: ${spacing.sm};

  &:hover {
    border-color: ${colors.primary.light};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    background: linear-gradient(
      to right bottom,
      ${colors.background.light},
      rgba(255, 255, 255, 0.8)
    );
  }
`;

export const buttonCss = css`
  padding: ${spacing.sm} ${spacing.lg};
  border-radius: 8px;
  font-weight: ${typography.fontWeight.medium};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition:
      transform 0.5s ease,
      opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &::after {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const cardMetadataCss = css`
  display: flex;
  gap: ${spacing.sm};
  color: ${colors.background.dark};
  font-size: ${typography.fontSize.sm};
  align-items: center;
  transition: all 0.2s ease;

  svg {
    color: ${colors.primary.light};
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${colors.primary.dark};

    svg {
      transform: scale(1.1);
      color: ${colors.primary.dark};
    }
  }
`;

export const pageContainerCss = css`
  padding: ${spacing.xl};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`;

export const transfersContainerCss = css`
  min-width: 480px;
  margin: 0 auto;
  background: ${colors.background.light};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.xl};
  background: ${colors.background.light};
  border-bottom: 1px solid ${colors.neutral[200]};

  h1 {
    font-size: ${typography.fontSize.xl};
    color: ${colors.background.dark};
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: ${spacing.lg};
    flex-direction: column;
    gap: ${spacing.md};

    h1 {
      font-size: ${typography.fontSize.lg};
    }
  }
`;

export const transferListCss = css`
  padding: ${spacing.lg};
  display: grid;
  gap: ${spacing.md};

  & > div:nth-of-type(even) {
    background: ${colors.neutral[200]};
    border: 1px solid ${colors.background.dark};
  }

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`;

export const cardHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  gap: ${spacing.md};

  h4 {
    font-size: ${typography.fontSize.md};
    color: ${colors.background.dark};
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const leftContentRowCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
`;

export const memoTextCss = css`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.background.dark};
  margin: 0 0 12px 0;
`;

export const statusBadgeCss = (status: string) => css`
  padding: ${spacing.xs} ${spacing.md};
  margin-top: 32px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  color: white;
  background: ${status === 'COMPLETED'
    ? colors.success.light
    : status === 'FAILED'
      ? colors.error.light
      : status === 'IN_REVIEW'
        ? colors.warning.light
        : colors.primary.light};
  text-transform: uppercase;
`;

export const recipientInfoCss = css`
  display: grid;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.neutral[100]};
`;

export const amountTextCss = css`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.success.dark};
  margin: ${spacing.xs} 0;
`;

export const detailTextCss = css`
  font-size: ${typography.fontSize.sm};
  color: ${colors.secondary.light};
  margin: ${spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

export const actionsCss = css`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.md};
`;

export const loadingContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export const recipientHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${spacing.sm};
  border-bottom: 1px dashed ${colors.neutral[200]};
`;

export const feeDetailsCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing.md};
  padding: ${spacing.sm};
  border-radius: 6px;
  margin-top: ${spacing.sm};
`;

export const feeItemCss = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  border-radius: 6px;
  padding: ${spacing.sm};
  background: ${colors.neutral[200]};
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    background: ${colors.neutral[300]};
    transform: translateY(-2px);

    span:last-of-type {
      color: ${colors.primary.light};
    }
  }

  span:first-of-type {
    font-size: ${typography.fontSize.xs};
    color: ${colors.background.dark};
    transition: color 0.2s ease;
  }

  span:last-of-type {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.primary.dark};
    transition: color 0.2s ease;
  }
`;
