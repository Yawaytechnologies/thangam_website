import { Link } from 'react-router';
import { Brand } from '../ui/Brand';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <section className="footer-column">
          <h2>Explore</h2>
          <Link to="/about">About us</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/faq">Frequently asked questions</Link>
          <Link to="/contact">Contact</Link>
        </section>
        <section className="footer-column">
          <h2>Enquiries</h2>
          <p>Looking for plots, flats, villas, or farm land?</p>
          <Link className="footer-cta" to="/site-visit">Plan a site visit <span aria-hidden="true">{'\u2197'}</span></Link>
        </section>
        <section className="footer-column">
          <h2>Sri Thangam Housing</h2>
          <p>Property is personal. So is our approach.</p>
          <p>Helping you explore your next chapter since 1999.</p>
          <Link to="/about" className="footer-about-link">Our story <span aria-hidden="true">{'\u2197'}</span></Link>
        </section>
      </div>
      <div className="footer-bottom">
        <Brand/>
        <span>&copy; {new Date().getFullYear()} Sri Thangam Housing. All rights reserved.</span>
      </div>
    </footer>
  );
}
