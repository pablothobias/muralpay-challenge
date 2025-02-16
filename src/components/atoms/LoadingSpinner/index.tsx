import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { spinnerContainer } from './styles';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = 'var(--primary)',
}) => {
  return (
    <div css={spinnerContainer}>
      <ClipLoader loading size={size} color={color} />
    </div>
  );
};

export default LoadingSpinner;
