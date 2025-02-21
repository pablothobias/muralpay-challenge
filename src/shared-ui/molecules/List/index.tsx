import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { emptyStateCss, listContainerCss, listItemCss, loadingContainerCss } from './styles';

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
      <div css={loadingContainerCss}>
        <LoadingSpinner />
      </div>
    );

  if (items && items.length === 0) {
    return (
      <div css={emptyStateCss(theme)}>
        <IoInformationCircleOutline size={48} />
        <h4>We couldn’t find any items at the moment.</h4>
        <p>Try refreshing the page or adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div css={listContainerCss(theme)}>
      {items.map((item: ListType) => (
        <div key={item.id as string} css={listItemCss(theme)} onClick={() => onClick?.(item.id)}>
          {item.element as ReactElement}
        </div>
      ))}
    </div>
  );
}

export default List;
