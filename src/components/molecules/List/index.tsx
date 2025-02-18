import { useTheme } from '@emotion/react';
import { ReactElement } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { emptyStateCss, listContainerCss, listItemCss } from './styles';

type ListType = {
  element: ReactElement;
  id: string;
};
type ListProps = {
  items: ListType[];
  emptyStateMessage?: string;
  className?: string;
};

function List({ items, emptyStateMessage = 'No items to display', className }: ListProps) {
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
      {items.map((item: ListType) => (
        <div key={item.id as string} css={listItemCss(theme)}>
          {item.element as ReactElement}
        </div>
      ))}
    </div>
  );
}

export default List;
