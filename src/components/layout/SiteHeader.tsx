import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Brand } from '../ui/Brand';
import { navigation, portfolioItems } from './navigation';

export function SiteHeader({ onPlanVisit: plan }: { onPlanVisit: () => void }) {
  const [mobile, setMobile] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const location = useLocation();
  const portfolioActive = location.pathname.startsWith('/portfolio');
  const closeMenus = () => { setMobile(false); setPortfolioOpen(false); };
  const renderLink = (item: typeof navigation[number]) => item.href.startsWith('/')
    ? <Link key={item.label} className={location.pathname === item.href ? 'active' : ''} aria-current={location.pathname === item.href ? 'page' : undefined} to={item.href} onClick={closeMenus}>{item.label}</Link>
    : <a key={item.label} className={location.pathname === '/' && location.hash === item.href ? 'active' : ''} href={`/${item.href}`} onClick={closeMenus}>{item.label}</a>;
  return (<> <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Brand/>
      <nav aria-label="Main navigation" className={mobile ? 'nav-open' : ''}>
        {navigation.filter((item) => item.label === 'About Us').map(renderLink)}
        <div className={`portfolio-nav${portfolioOpen ? ' portfolio-open' : ''}${portfolioActive ? ' active' : ''}`} onMouseEnter={() => setPortfolioOpen(true)} onMouseLeave={() => setPortfolioOpen(false)}>
          <button type="button" className="portfolio-toggle" aria-expanded={portfolioOpen} aria-controls="portfolio-menu" onClick={() => setPortfolioOpen(!portfolioOpen)} onFocus={() => setPortfolioOpen(true)}>
            Portfolio <ChevronDown size={15} aria-hidden="true"/>
          </button>
          {portfolioOpen && <div className="portfolio-menu" id="portfolio-menu">{portfolioItems.map(renderLink)}</div>}
        </div>
        {navigation.filter((item) => item.label !== 'About Us').map(renderLink)}
      </nav>
      <button className="button header-cta" onClick={plan}>Plan a site visit <ArrowUpRight size={16}/></button>
      <button className="menu-toggle" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button>
    </header>
</>);
}
