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

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const transferCardCss = css`
  position: relative;
  display: flex;
  background: ${colors.background.light};
  flex-direction: column;
  gap: ${spacing.md};
  border-radius: 12px;
  border: 1px solid ${colors.neutral[200]};
  padding: ${spacing.md};
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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

  @media (min-width: ${breakpoints.md}) {
    padding: ${spacing.lg};
  }
`;

export const recipientCardCss = css`
  background: ${colors.background.light};
  border-radius: 8px;
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[100]};
  display: grid;
  gap: ${spacing.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${scaleIn} 0.3s ease-out;

  &:hover {
    border-color: ${colors.primary.light};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    background: linear-gradient(
      to right bottom,
      ${colors.background.light},
      rgba(255, 255, 255, 0.8)
    );
  }

  @media (min-width: ${breakpoints.md}) {
    padding: ${spacing.md};
  }
`;

export const buttonCss = css`
  padding: ${spacing.sm} ${spacing.md};
  border-radius: 8px;
  font-weight: ${typography.fontWeight.medium};
  transition: all 0.2s ease;
  width: 100%;

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

  @media (min-width: ${breakpoints.md}) {
    width: auto;
    padding: ${spacing.sm} ${spacing.lg};
  }
`;

export const cardMetadataCss = css`
  display: flex;
  gap: ${spacing.sm};
  color: ${colors.background.dark};
  font-size: ${typography.fontSize.sm};
  align-items: center;
  transition: all 0.2s ease;
  flex-wrap: wrap;

  svg {
    color: ${colors.primary.light};
    transition: transform 0.2s ease;
    min-width: 16px;
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
  padding: ${spacing.md};
  min-height: 100vh;

  @media (min-width: ${breakpoints.md}) {
    padding: ${spacing.xl};
  }
`;

export const transfersContainerCss = css`
  width: 100%;
  margin: 0 auto;
  background: ${colors.background.light};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (min-width: ${breakpoints.sm}) {
    min-width: 480px;
  }
`;

export const headerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing.md};
  background: ${colors.background.light};
  border-bottom: 1px solid ${colors.neutral[200]};
  gap: ${spacing.md};

  h1 {
    font-size: ${typography.fontSize.lg};
    color: ${colors.background.dark};
    margin: 0;
  }

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    padding: ${spacing.xl};

    h1 {
      font-size: ${typography.fontSize.xl};
    }
  }
`;

export const transferListCss = css`
  padding: ${spacing.md};
  display: grid;
  gap: ${spacing.md};

  & > div:nth-of-type(even) {
    border: 1px solid ${colors.background.dark};
    border-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: ${breakpoints.md}) {
    padding: ${spacing.lg};
  }
`;

export const cardHeaderCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  gap: ${spacing.md};

  h4 {
    font-size: ${typography.fontSize.md};
    color: ${colors.background.dark};
    margin: 0;
  }

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const leftContentRowCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  width: 100%;
`;

export const memoTextCss = css`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.background.dark};
  margin: 0 0 12px 0;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize.md};
  }
`;

export const statusBadgeCss = (status: string) => css`
  padding: ${spacing.xs} ${spacing.md};
  margin-top: ${spacing.md};
  border-radius: 20px;
  font-size: ${typography.fontSize.xs};
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
  align-self: flex-start;

  @media (min-width: ${breakpoints.md}) {
    margin-top: 32px;
    font-size: ${typography.fontSize.sm};
  }
`;

export const recipientInfoCss = css`
  display: grid;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.neutral[100]};

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const amountTextCss = css`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.success.dark};
  margin: ${spacing.xs} 0;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize.lg};
  }
`;

export const detailTextCss = css`
  font-size: ${typography.fontSize.xs};
  color: ${colors.secondary.light};
  margin: ${spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  word-break: break-all;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize.sm};
  }
`;

export const actionsCss = css`
  display: flex;
  justify-content: center;
  margin-top: ${spacing.md};
  width: 100%;

  @media (min-width: ${breakpoints.md}) {
    justify-content: flex-end;
  }
`;

export const loadingContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  @media (min-width: ${breakpoints.md}) {
    height: 500px;
  }
`;

export const recipientHeaderCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: ${spacing.sm};
  border-bottom: 1px dashed ${colors.neutral[200]};
  gap: ${spacing.sm};

  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const feeDetailsCss = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  border-radius: 6px;
  margin-top: ${spacing.sm};

  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md};
  }

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
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

export const mobileActionsContainerCss = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.background.light};
  padding: ${spacing.md};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  justify-content: center;

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const fixedBottomButtonCss = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.background.light};
  padding: ${spacing.md};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
  display: flex;
  justify-content: center;

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const fabButtonCss = css`
  position: fixed;
  bottom: ${spacing.lg};
  right: ${spacing.lg};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.primary.light};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${colors.primary.dark};
  }

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const mobileTransferCardCss = css`
  ${transferCardCss};
  padding: ${spacing.md};

  &:active {
    background: ${colors.neutral[100]};
  }
`;

export const walletAddressCss = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (min-width: ${breakpoints.md}) {
    max-width: 300px;
  }
`;

export const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  padding-bottom: calc(${spacing.lg} + 72px); /* Add extra padding for the fixed button */

  @media (min-width: ${breakpoints.md}) {
    padding-bottom: ${spacing.lg}; /* Reset to normal padding on desktop */
  }
`;

export const fullWidthButtonCss = css`
  width: 100%;
`;
