export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Leaders', href: '/leaders' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
];

export const portfolioItems: NavItem[] = [
  { label: 'Residential Plots', href: '/portfolio/residential-plots' },
  { label: 'Apartments', href: '/portfolio/apartments' },
  { label: 'Commercial Land', href: '/portfolio/commercial-land' },
  { label: 'Farm Land', href: '/portfolio/farm-land' },
  { label: 'Premium Villas', href: '/portfolio/premium-villas' },
];

export const ids = ['about', 'plots', 'leaders', 'faq', 'contact'];
