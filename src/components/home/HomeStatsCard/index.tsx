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
};

const HomeStatsCard = ({ statsValue, statsLabel, title, icon, variant }: HomeStatsCardProps) => {
  const theme = useTheme();

  return (
    <Card css={statsCardStyles(theme, variant)}>
      <Icon name={icon as IconProps['name']} size={32} />
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">{statsValue}</p>
        <span className="stats-label">{statsLabel}</span>
      </div>
    </Card>
  );
};

export default HomeStatsCard;
