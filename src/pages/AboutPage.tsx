import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Building2, Check, Compass, HeartHandshake, House, MapPinned, MessageCircle, Sprout } from 'lucide-react';
import { SiteHeader } from '../components/layout/SiteHeader';
import { VisitDialog } from '../components/properties/VisitDialog';
import '../styles/about.css';
import { CompanyGallery } from '../components/ui/CompanyGallery';
import { companyStoryPhoto } from '../assets/company-photos';

const strengths = [
  { icon: Compass, number: '01', title: 'Start with the right location', text: 'Look beyond the address. Consider everyday access, your surroundings, and how a place fits the life you want to build.' },
  { icon: MessageCircle, number: '02', title: 'Make room for every question', text: 'From your first enquiry to a site visit, explore the details that matter to you and take the time to understand your options.' },
  { icon: HeartHandshake, number: '03', title: 'Keep your plans at the centre', text: 'A family home, a quieter retreat, or a property investment. Your priorities should shape the journey from the beginning.' },
];

const steps = [
  { title: 'Tell us what matters', text: 'Start with your preferred location, property type, and plans for the future.' },
  { title: 'Explore the possibilities', text: 'Compare your options, ask questions, and take a closer look at the surroundings.' },
  { title: 'Plan your next step', text: 'Prepare for a site visit and review the details before making your decision.' },
];

export function AboutPage() {
  const [enquiry, setEnquiry] = useState(false);
  const [saved, setSaved] = useState(false);
  const planVisit = () => { setSaved(false); setEnquiry(true); };
  const close = () => { setEnquiry(false); setSaved(false); };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return <>
    <SiteHeader onPlanVisit={planVisit}/>
    <main id="main" className="about-page">
      <section className="about-intro about-container" aria-labelledby="about-title">
        <span className="about-pill"><span aria-hidden="true"/> A LITTLE ABOUT US</span>
        <h1 id="about-title">Good places.<br/><span>Even better beginnings.</span></h1>
        <p>We’re Sri Thangam Housing. We help you explore places to live, grow, and build your next chapter—with your plans at the heart of it.</p>
        <div className="about-actions">
          <a className="about-primary" href="/#plots">Explore properties <ArrowUpRight size={18}/></a>
          <a className="about-secondary" href="#our-story">Get to know us <ArrowRight size={17}/></a>
        </div>
        <div className="about-categories" aria-label="Property categories">
          <span><MapPinned size={17}/> Plots</span><span><Building2 size={17}/> Flats</span>
          <span><House size={17}/> Villas</span><span><Sprout size={17}/> Farm land</span>
        </div>
      </section>

      <section id="our-story" className="about-container about-story" aria-labelledby="story-title">
        <div className={`about-story-image${companyStoryPhoto ? ' about-story-image--company' : ''}`}>
          <img src={companyStoryPhoto?.src ?? 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85'} alt={companyStoryPhoto?.alt ?? 'An inviting home surrounded by a green garden'} loading="lazy"/>
          {!companyStoryPhoto && <div className="about-image-note"><span className="about-note-icon"><House size={22}/></span><div><strong>A place for your next chapter</strong><span>It starts with what feels right for you.</span></div></div>}
        </div>
        <div className="about-story-copy">
          <p className="about-kicker">OUR STORY</p>
          <h2>Property is personal.<br/><span>So is our approach.</span></h2>
          <p>A new home is more than a new address. It’s the routines you’ll create, the people you’ll share it with, and the future you’ll make your own.</p>
          <p>Since 1999, Sri Thangam Housing has been part of the property journey. Our offering spans plots, flats, villas, and farm land, bringing different possibilities to different plans.</p>
          <div className="about-story-divider"/>
          <div className="about-story-signoff"><span className="about-check"><Check size={16}/></span><span>Your needs. Your questions. Your next step.</span></div>
        </div>
      </section>

      <CompanyGallery category="company"/>
      <section className="about-container about-principles" aria-labelledby="principles-title">
        <div className="about-section-heading"><p className="about-kicker">BUILT AROUND YOU</p><h2>A clearer way to<br/>find your place.</h2><p>Thoughtful choices start with a few simple principles.</p></div>
        <div className="about-card-grid">{strengths.map(({ icon: Icon, number, title, text }) => <article className="about-feature-card" key={number}>
          <div className="about-card-top"><span className="about-feature-icon"><Icon size={23}/></span><span>{number}</span></div>
          <h3>{title}</h3><p>{text}</p>
        </article>)}</div>
      </section>

      <section className="about-journey" aria-labelledby="journey-title">
        <div className="about-container">
          <div className="about-section-heading"><p className="about-kicker">FROM AN IDEA TO A NEXT STEP</p><h2>Your journey, made simpler.</h2><p>No need to have every answer. Start with what you’re looking for.</p></div>
          <ol className="about-steps">{steps.map((step, index) => <li key={step.title}><span className="about-step-number">{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="about-container" aria-labelledby="about-contact-title">
        <div className="about-cta" id="contact"><div><span className="about-pill about-pill-light">LET’S MAKE A BEGINNING</span><h2 id="about-contact-title">Your next chapter<br/>starts with a conversation.</h2><p>Bring your ideas. Let’s explore the possibilities together.</p></div><button className="about-primary about-primary-light" onClick={planVisit}>Plan a site visit <ArrowUpRight size={18}/></button></div>
      </section>
    </main>
    {enquiry && <VisitDialog selected={null} saved={saved} onClose={close} onPlan={planVisit} onSaved={() => setSaved(true)}/>}
  </>;
}
