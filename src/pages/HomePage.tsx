import { useState } from 'react';
import { ArrowUpRight, Search, Trees, Compass, HeartHandshake, MoveUpRight, SlidersHorizontal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { usePropertyUpdates } from '../hooks/use-property-updates';
import { usePropertyFilters } from '../stores/property-filters';
import { useProperties } from '../hooks/use-properties';
import { sampleProperties, photo } from '../assets/data/sample-properties';
import type { Property } from '../types/property';
import { propertySlug } from '../lib/property';
import { SiteHeader } from '../components/layout/SiteHeader';
import { FaqSection } from '../components/home/FaqSection';
import { PropertyCard } from '../components/properties/PropertyCard';
import { VisitDialog } from '../components/properties/VisitDialog';
import { NotFoundPage } from './NotFoundPage';
import { HeroVideo } from '../components/home/HeroVideo';
import { VideoCaption } from '../components/home/VideoCaption';
import { CompanyGallery } from '../components/ui/CompanyGallery';

const propertyTypeOptions = [
  { label: 'Residential Plots', value: 'Residential plots' },
  { label: 'Apartments', value: 'Apartments' },
  { label: 'Commercial Land', value: 'Commercial land' },
  { label: 'Farm Land', value: 'Farm land' },
  { label: 'Premium Villas', value: 'Villas' },
];

export function HomePage() {
  const [location, setLocation] = useState('All locations');
  const [type, setType] = useState('All properties');
  const { filter, setFilter } = usePropertyFilters();
  const navigate = useNavigate();
  const { slug } = useParams();
  const propertiesQuery = useProperties();
  const properties = propertiesQuery.data ?? sampleProperties;
  const locations = Array.from(new Set(properties.map(property => property.location))).sort();
  const selected = properties.find(property => propertySlug(property) === slug) ?? null;
  const setSelected = (property: Property | null) => {
    if (property) navigate('/plots/' + propertySlug(property));
    else if (slug) navigate('/', { replace: true });
  };
  usePropertyUpdates();
  const [enquiry, setEnquiry] = useState(false);
  const [saved, setSaved] = useState(false);
  const filtered = properties.filter(p => (filter.location === 'All locations' || p.location === filter.location) && (filter.type === 'All properties' || p.type === filter.type));
  const close = () => { setSelected(null); setEnquiry(false); setSaved(false); };
  const plan = () => { setSelected(null); setEnquiry(true); setSaved(false); };
  if (slug && !selected) return <NotFoundPage property/>;
  return <>
    <SiteHeader onPlanVisit={plan}/>
    <main id="main">
      <section className="hero" id="home" aria-label="Sri Thangam Housing introduction">
        <HeroVideo/>
        <div className="video-caption-shade" aria-hidden="true"/>
        <VideoCaption/>
      </section>
      <section className="search-wrap" aria-label="Find a property"><form className="search-panel" onSubmit={e => { e.preventDefault(); setFilter({location, type}); document.getElementById('plots')?.scrollIntoView({behavior:'smooth'}); }}><div className="search-intro"><Compass size={25}/><span>Good things start<br/><strong>with the right place.</strong></span></div><label>YOUR PREFERRED LOCATION<select value={location} onChange={e => setLocation(e.target.value)}><option>All locations</option>{locations.map(item => <option key={item}>{item}</option>)}</select></label><label>WHAT ARE YOU LOOKING FOR?<select value={type} onChange={e => setType(e.target.value)}><option>All properties</option>{propertyTypeOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><button className="button" type="submit"><Search size={17}/> Explore properties</button></form></section>
      <section className="intro section" id="about"><div><div className="eyebrow">MORE THAN A PIECE OF LAND</div><h2>Every great story<br/>starts with <em>a place.</em></h2></div><div className="intro-copy"><p>Some places just feel right. A quiet neighbourhood. An open stretch of green. A space you can already imagine calling your own.</p><p>At Sri Thangam Housing, we help you explore those possibilities - with a personal approach to finding a place that fits your life.</p><a className="text-link" href="#values">Get to know us <ArrowUpRight size={18}/></a></div></section>
      <section className="properties section" id="plots"><div className="section-heading"><div><div className="eyebrow">FIND YOUR NEXT CHAPTER</div><h2>A place for <em>every dream.</em></h2></div><button className="text-link" onClick={() => { setFilter({location:'All locations',type:'All properties'}); setLocation('All locations'); setType('All properties'); }}>View all properties <ArrowUpRight size={18}/></button></div><div className="property-toolbar"><span>EXPLORE THE POSSIBILITIES</span><span><SlidersHorizontal size={14}/> {filtered.length} sample properties</span></div><div role="status" className="text-xs text-stone-600 mb-4">{propertiesQuery.isError ? 'The catalogue is temporarily unavailable. Showing sample properties.' : propertiesQuery.isFetching ? 'Refreshing the sample catalogue...' : ''}</div><div className="property-grid">{filtered.map(p => <PropertyCard key={p.name} property={p} onSelect={setSelected}/>)}</div>{!filtered.length && <div className="empty-state"><Trees size={32}/><h3>A different combination could be your perfect fit.</h3><p>Try another location or property type to explore our sample collection.</p></div>}<p className="sample-note">A preview of what is possible. Listings, areas, and images are illustrative, not live offers.</p></section>
      <section className="values-section" id="values"><div className="values-photo"><img src={photo('photo-1441974231531-c6227db76b6e')} alt="Sunlight filtering through a green forest" loading="lazy"/><div className="image-caption">A little more nature.<br/><em>A lot more life.</em></div></div><div className="values-copy"><div className="eyebrow">THE THANGAM APPROACH</div><h2>Your future.<br/><em>Our personal commitment.</em></h2><p>A property is a big decision. We believe the journey should feel considered, clear, and centred on you.</p>{[{icon:Compass,title:'Places with potential',copy:'Explore locations with your lifestyle and long-term plans in mind.'},{icon:HeartHandshake,title:'People before property',copy:'Your questions, your priorities, and your pace guide the conversation.'},{icon:Trees,title:'Space for a fuller life',copy:'Discover the possibility of a home with room to breathe and grow.'}].map(v => <div className="value" key={v.title}><v.icon size={23}/><div><h3>{v.title}</h3><p>{v.copy}</p></div></div>)}</div></section>
      <section className="leaders section" id="leaders"><div className="eyebrow">PEOPLE BEHIND THE PROMISE</div><h2>A shared vision.<br/><em>A personal connection.</em></h2><p>Meet the chairman and directors guiding Sri Thangam Housing, and discover the people behind our promise.</p><a className="text-link" href="/leaders">Meet our leaders <ArrowUpRight size={18}/></a><span className="leaders-decoration" aria-hidden="true">sth.</span></section>
      <CompanyGallery category="project"/>
      <FaqSection/>
      <section className="contact section" id="contact"><div><div className="eyebrow light">YOUR NEXT CHAPTER IS WAITING</div><h2>Let's find a place<br/>you'll <em>love to call yours.</em></h2><p>Bring your ideas. We'll help you explore the possibilities.</p></div><button className="button cream" onClick={plan}>Plan your first visit <MoveUpRight size={18}/></button></section>
    </main>
    {(selected || enquiry) && <VisitDialog selected={selected} saved={saved} onClose={close} onPlan={plan} onSaved={() => setSaved(true)}/>}
  </>;
}
