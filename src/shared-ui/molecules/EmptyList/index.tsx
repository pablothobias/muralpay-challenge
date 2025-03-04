import Icon from '@/shared-ui/atoms/Icon';

import { type ThemeType } from '@/styles/theme';

import { emptyStateCss } from './styles';

type EmptyListProps = {
  theme: ThemeType;
};

const EmptyList = ({ theme }: EmptyListProps) => (
  <div css={emptyStateCss(theme)}>
    <Icon name="empty" size={48} />
    <h4>We couldn’t find any items at the moment.</h4>
    <p>Try refreshing the page or adjusting your filters.</p>
  </div>
);

export default EmptyList;
