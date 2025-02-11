
import { render, screen } from '@testing-library/react';
import KeyMetricsCard from '../KeyMetricsCard';

describe('KeyMetricsCard', () => {
  const defaultProps = {
    title: 'Test Metric',
    value: '100',
    icon: 'trending-up',
    trend: 'positive',
    trendValue: '10%',
  };

  it('renders correctly with all props', () => {
    render(<KeyMetricsCard {...defaultProps} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
  });
});
