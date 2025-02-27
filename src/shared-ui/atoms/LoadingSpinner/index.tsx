import { useTheme } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

import { spinnerContainer } from './styles';

type LoadingSpinnerProps = {
  size?: number;
  color?: string;
};

const LoadingSpinner = ({ size = 50, color }: LoadingSpinnerProps) => {
  const theme = useTheme();

  return (
    <div css={spinnerContainer}>
      <ClipLoader
        data-testid="loading-spinner"
        loading
        size={size}
        color={color || theme.colors.primary}
      />
    </div>
  );
};

export default LoadingSpinner;
