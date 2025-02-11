
import { render, screen } from '@testing-library/react';
import { KeyMetricsCard } from '../KeyMetricsCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

  it('renders without trend information', () => {
    const propsWithoutTrend = {
      ...defaultProps,
      trend: undefined
    };
    
    render(<KeyMetricsCard {...propsWithoutTrend} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.queryByText('↑')).not.toBeInTheDocument();
    expect(screen.queryByText('↓')).not.toBeInTheDocument();
  });

  it('renders with downward trend', () => {
    const propsWithDownTrend = {
      ...defaultProps,
      icon: TrendingDown,
      trend: {
        direction: 'down' as const,
        color: 'red' as const
      }
    };
    
    render(<KeyMetricsCard {...propsWithDownTrend} />);
    
    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle.parentElement).toHaveTextContent('↓');
  });

  it('renders with numeric value', () => {
    const propsWithNumber = {
      ...defaultProps,
      value: 42
    };
    
    render(<KeyMetricsCard {...propsWithNumber} />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders with ReactNode title', () => {
    const propsWithReactNodeTitle = {
      ...defaultProps,
      title: <span data-testid="custom-title">Custom Title</span>
    };
    
    render(<KeyMetricsCard {...propsWithReactNodeTitle} />);
    
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
