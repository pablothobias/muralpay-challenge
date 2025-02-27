import { ReactNode } from 'react';

import { useTheme } from '@emotion/react';

import {
  cardContentCss,
  cardFooterCss,
  cardHeaderCss,
  cardVariantCss,
  cardWrapperCss,
} from './styles';

export type CardProps = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  variant?: 'outlined' | 'elevated' | 'flat';
  className?: string;
  onClick?: () => void;
  headerActions?: ReactNode;
};

const Card = ({
  children,
  title,
  footer,
  variant = 'outlined',
  className,
  onClick,
  headerActions,
}: CardProps) => {
  const theme = useTheme();

  return (
    <div
      css={[cardWrapperCss(theme), cardVariantCss(theme)[variant]]}
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
    >
      {(title || headerActions) && (
        <div css={cardHeaderCss}>
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {title && <h3>{title}</h3>}
            {headerActions}
          </div>
        </div>
      )}
      <div css={cardContentCss}>{children}</div>
      {footer && <div css={cardFooterCss}>{footer}</div>}
    </div>
  );
};

export default Card;
