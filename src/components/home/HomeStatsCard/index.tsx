import { Card, Icon } from '@/shared-ui';
import { useTheme } from '@emotion/react';
import { statsCardStyles } from './styles';
import { IconProps } from '@/shared-ui/atoms/Icon';

type HomeStatsCardProps = {
  statsValue: string;
  statsLabel: string;
  title: string;
  icon: IconProps['name'];
  variant?: 'info' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
};

const HomeStatsCard = ({
  statsValue,
  statsLabel,
  title,
  icon,
  variant,
  trend,
}: HomeStatsCardProps) => {
  const theme = useTheme();

  return (
    <Card css={statsCardStyles(theme, variant)}>
      <Icon name={icon as IconProps['name']} size={32} />
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">{statsValue}</p>
        <span className="stats-label">{statsLabel}</span>
        {trend && (
          <span
            data-testid="trend-value"
            className={trend.direction === 'down' ? 'negative' : 'positive'}
          >
            {trend.direction === 'down' ? '-' : '+'}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </Card>
  );
};

export default HomeStatsCard;
