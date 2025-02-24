import { render, screen } from '@testing-library/react';
import { TestProviders } from '@/utils/test/TestProviders';
import HomeStatsCard from '../index';
import { IconProps } from '@/shared-ui/atoms/Icon';

describe('HomeStatsCard', () => {
  const defaultProps = {
    title: 'Total Balance',
    statsValue: '$1,000.00',
    statsLabel: 'Across all accounts',
    icon: 'wallet' as IconProps['name'],
    trend: {
      value: 10,
      direction: 'up' as const,
    },
  };

  it('renders correctly with all props', () => {
    render(
      <TestProviders initialTheme="light">
        <HomeStatsCard {...defaultProps} />
      </TestProviders>,
    );

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.statsValue)).toBeInTheDocument();
    expect(screen.getByTestId('trend-value')).toHaveTextContent('10%');
  });

  it('renders with negative trend', () => {
    const negativeProps = {
      ...defaultProps,
      trend: {
        value: -5,
        direction: 'down' as const,
      },
    };

    render(
      <TestProviders initialTheme="light">
        <HomeStatsCard {...negativeProps} />
      </TestProviders>,
    );

    const trendValue = screen.getByTestId('trend-value');
    expect(trendValue).toHaveTextContent('-5%');
    expect(trendValue).toHaveClass('negative');
  });

  it('renders without trend data', () => {
    const propsWithoutTrend = {
      ...defaultProps,
      trend: undefined,
    };

    render(
      <TestProviders initialTheme="light">
        <HomeStatsCard {...propsWithoutTrend} />
      </TestProviders>,
    );

    expect(screen.queryByTestId('trend-value')).not.toBeInTheDocument();
  });
});
