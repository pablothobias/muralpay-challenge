import { render } from '@testing-library/react';

import { useRouter } from 'next/router';

import { SEO, getPageMetadata } from '../index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SEO Component', () => {
  const mockRouter = {
    pathname: '/',
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders default meta tags', () => {
    const { container } = render(<SEO />);

    const metaTags = container.querySelectorAll('meta');

    expect(document.title).toBe('Home | MuralPay');
    expect(metaTags).toBeTruthy();
  });

  it('renders custom title and description', () => {
    const customTitle = 'Custom Title';
    const customDescription = 'Custom Description';

    render(<SEO title={customTitle} description={customDescription} />);

    expect(document.title).toBe(customTitle);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe(customDescription);
  });

  it('adds noindex meta tag when specified', () => {
    render(<SEO noindex />);

    const robotsMeta = document.querySelector('meta[name="robots"]');
    expect(robotsMeta?.getAttribute('content')).toBe('noindex,nofollow');
  });
});

describe('getPageMetadata', () => {
  it('returns correct metadata for home page', () => {
    const metadata = getPageMetadata('/');
    expect(metadata).toEqual({
      title: 'Home | MuralPay',
      description: 'MuralPay dashboard - Manage your transfers and accounts securely',
    });
  });

  it('returns correct metadata for accounts page', () => {
    const metadata = getPageMetadata('/accounts');
    expect(metadata).toEqual({
      title: 'Manage Accounts | MuralPay',
      description: 'Manage your MuralPay accounts - Add, edit, and view your financial accounts',
    });
  });

  it('returns default metadata for unknown routes', () => {
    const metadata = getPageMetadata('/unknown');
    expect(metadata).toEqual({
      title: 'MuralPay - Secure Money Transfer Platform',
      description: 'MuralPay - Your secure platform for money transfers and account management',
    });
  });
});
