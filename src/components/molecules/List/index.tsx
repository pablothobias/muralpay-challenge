import { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import {
  listContainerCss,
  listItemCss,
  iconWrapperCss,
  contentCss,
  rightContentCss,
  emptyStateCss,
} from './styles';
import { IoInformationCircleOutline } from 'react-icons/io5';

export interface ListItemData {
  id: string;
  title: string;
  subtitle?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  icon?: ReactNode;
  iconBackground?: string;
  onClick?: () => void;
}

interface ListProps {
  items: ListItemData[];
  emptyStateMessage?: string;
  className?: string;
}

const List = ({
  items,
  emptyStateMessage = 'No items to display',
  className,
}: ListProps) => {
  const theme = useTheme();

  if (items.length === 0) {
    return (
      <div css={emptyStateCss(theme)} className={className}>
        <IoInformationCircleOutline size={48} />
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div css={listContainerCss(theme)} className={className}>
      {items.map((item) => (
        <div
          key={item.id}
          css={listItemCss(theme)}
          onClick={item.onClick}
          role={item.onClick ? 'button' : 'listitem'}
        >
          {item.icon && (
            <div
              css={[
                iconWrapperCss,
                { background: item.iconBackground || theme.colors.muted },
              ]}
            >
              {item.icon}
            </div>
          )}
          <div css={contentCss}>
            <h3>{item.title}</h3>
            {item.subtitle && <p>{item.subtitle}</p>}
          </div>
          {(item.rightTitle || item.rightSubtitle) && (
            <div css={rightContentCss}>
              {item.rightTitle && <span>{item.rightTitle}</span>}
              {item.rightSubtitle && <small>{item.rightSubtitle}</small>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
