
import { render, screen } from '@testing-library/react';
import { KeyMetricsCard } from '../KeyMetricsCard';
import { TrendingUp } from 'lucide-react';

describe('KeyMetricsCard', () => {
  const defaultProps = {
    title: 'Test Metric',
    value: '100',
    subtitle: 'Test Subtitle',
    icon: TrendingUp,
    trend: {
      direction: 'up' as const,
      color: 'green' as const
    }
  };

  it('renders correctly with all props', () => {
    render(<KeyMetricsCard {...defaultProps} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });
});

