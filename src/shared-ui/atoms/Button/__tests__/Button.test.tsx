import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '@/utils/test/TestProviders';

import Button from '../index';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      renderWithProviders(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click me');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with custom props', () => {
      renderWithProviders(
        <Button variant="secondary" size="large" type="submit" disabled>
          Submit
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
    });

    it('renders with left icon', () => {
      const MockIcon = () => <span data-testid="left-icon">+</span>;
      renderWithProviders(
        <Button icon={<MockIcon />} iconPosition="left">
          Add Item
        </Button>,
      );
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('left-icon');
      expect(icon).toBeInTheDocument();
      expect(button.firstChild).toBe(icon);
    });

    it('renders with right icon', () => {
      const MockIcon = () => <span data-testid="right-icon">→</span>;
      renderWithProviders(
        <Button icon={<MockIcon />} iconPosition="right">
          Next
        </Button>,
      );
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('right-icon');
      expect(icon).toBeInTheDocument();
      expect(button.lastChild).toBe(icon);
    });

    it('applies custom className', () => {
      const customClass = 'custom-button';
      renderWithProviders(<Button className={customClass}>Custom Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(customClass);
    });
  });

  describe('interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      renderWithProviders(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick handler when disabled', () => {
      const handleClick = jest.fn();
      renderWithProviders(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>,
      );
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'outlined'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        renderWithProviders(<Button variant={variant}>Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('theme handling', () => {
    it('handles theme correctly', () => {
      const { getByRole } = renderWithProviders(<Button>Button</Button>);
      expect(getByRole('button')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        renderWithProviders(<Button size={size}>Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });
});
