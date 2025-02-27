import { useTheme } from '@emotion/react';

import { Card, Icon } from '@/shared-ui';

import { IconProps } from '@/shared-ui/atoms/Icon';

import { actionCardStyles } from './styles';

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
