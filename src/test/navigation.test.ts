import { describe, expect, it } from 'vitest';
import { navigation, portfolioItems } from '../components/layout/navigation';

describe('navigation links', () => {
  it('routes the About Us item to its own page instead of the home section', () => {
    expect(navigation[0]).toEqual({ label: 'About Us', href: '/about' });
  });

  it('opens the dedicated leaders page', () => {
    expect(navigation.find((item) => item.label === 'Leaders')?.href).toBe('/leaders');
  });

  it('opens the dedicated contact page', () => {
    expect(navigation.find((item) => item.label === 'Contact')?.href).toBe('/contact');
  });

  it('navigates login to the deployed frontend', () => {
    expect(navigation.find((item) => item.label === 'Login')?.href).toBe('https://thangam-frontend.onrender.com');
  });

  it('shows Portfolio categories only inside the dropdown', () => {
    expect(navigation.map((item) => item.label)).toEqual(['About Us', 'Leaders', 'Contact', 'Login']);
    expect(portfolioItems).toEqual([
      { label: 'Residential Plots', href: '/portfolio/residential-plots' },
      { label: 'Apartments', href: '/portfolio/apartments' },
      { label: 'Commercial Land', href: '/portfolio/commercial-land' },
      { label: 'Farm Land', href: '/portfolio/farm-land' },
      { label: 'Premium Villas', href: '/portfolio/premium-villas' },
    ]);
  });
});
