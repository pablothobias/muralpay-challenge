import ClipLoader from 'react-spinners/ClipLoader';
import { spinnerContainer } from './styles';
import { colors } from '@/styles/variables';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner = ({
  size = 50,
  color = colors.primary,
}: LoadingSpinnerProps) => {
  return (
    <div css={spinnerContainer}>
      <ClipLoader loading size={size} color={color} />
    </div>
  );
};

export default LoadingSpinner;
