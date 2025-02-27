import { ReactElement } from 'react';

import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';

import { listContainerCss, listItemCss, loadingContainerCss } from './styles';
import EmptyList from '../EmptyList';

const LoadingSpinner = dynamic(() => import('@/shared-ui/atoms/LoadingSpinner'));

type ListType = {
  element: ReactElement;
  id: string;
};
type ListProps = {
  items: ListType[];
  loading: boolean;
  onClick?: (id?: string) => void;
};

function List({ items, loading, onClick }: ListProps) {
  const theme = useTheme();

  if (loading || !items)
    return (
      <div css={loadingContainerCss(theme)}>
        <LoadingSpinner />
      </div>
    );

  if (items && items.length === 0) return <EmptyList theme={theme} />;

  return (
    <div css={listContainerCss(theme)} role="list">
      {items.map((item: ListType) => (
        <div
          key={item.id as string}
          css={listItemCss(theme)}
          onClick={() => onClick?.(item.id)}
          role="listitem"
        >
          {item.element as ReactElement}
        </div>
      ))}
    </div>
  );
}

export default List;
