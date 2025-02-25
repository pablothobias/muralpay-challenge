import { Card, Icon } from '@/shared-ui';
import { useTheme } from '@emotion/react';
import { actionCardStyles } from './styles';
import { IconProps } from '@/shared-ui/atoms/Icon';

type HomeActionCardProps = {
  icon: IconProps['name'];
  title: string;
  description: string;
  onClick: () => void;
};

const HomeActionCard = ({ icon, title, description, onClick }: HomeActionCardProps) => {
  const theme = useTheme();

  return (
    <Card css={actionCardStyles(theme)} onClick={onClick}>
      <Icon name={icon} size={24} />
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
};

export default HomeActionCard;
