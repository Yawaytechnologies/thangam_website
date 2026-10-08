import { useState } from 'react';
import { ArrowUpRight, Building2, Home, Landmark, MoveUpRight, Trees, Warehouse } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { SiteHeader } from '../components/layout/SiteHeader';
import { PropertyCard } from '../components/properties/PropertyCard';
import { VisitDialog } from '../components/properties/VisitDialog';
import { sampleProperties } from '../assets/data/sample-properties';
import { useProperties } from '../hooks/use-properties';
import { propertySlug } from '../lib/property';
import type { Property } from '../types/property';
import { NotFoundPage } from './NotFoundPage';

type PortfolioStatus = 'ongoing' | 'completed';

const categories = {
  'residential-plots': {
    label: 'Residential Plots',
    type: 'Residential plots',
    icon: Landmark,
    copy: 'Explore plot concepts with room for a home, garden, and long-term value.',
  },
  apartments: {
    label: 'Apartments',
    type: 'Apartments',
    icon: Building2,
    copy: 'Discover apartment living options planned for everyday convenience.',
  },
  'commercial-land': {
    label: 'Commercial Land',
    type: 'Commercial land',
    icon: Warehouse,
    copy: 'Review land possibilities suited for business, visibility, and access.',
  },
  'farm-land': {
    label: 'Farm Land',
    type: 'Farm land',
    icon: Trees,
    copy: 'Find open land concepts for quieter weekends and greener plans.',
  },
  'premium-villas': {
    label: 'Premium Villas',
    type: 'Villas',
    icon: Home,
    copy: 'Browse villa concepts shaped around privacy, comfort, and generous space.',
  },
} as const;

export function PortfolioPage() {
  const { category } = useParams();
  const config = category ? categories[category as keyof typeof categories] : undefined;
  const navigate = useNavigate();
  const propertiesQuery = useProperties();
  const properties = propertiesQuery.data ?? sampleProperties;
  const [selected, setSelectedState] = useState<Property | null>(null);
  const [enquiry, setEnquiry] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<PortfolioStatus>('ongoing');

  if (!config) return <NotFoundPage />;

  const Icon = config.icon;
  const categoryProperties = properties.filter((property) => property.type.toLowerCase() === config.type.toLowerCase());
  const filtered = categoryProperties.filter((property) => (property.status ?? 'ongoing') === status);
  const setSelected = (property: Property | null) => {
    setSelectedState(property);
    if (property) navigate('/plots/' + propertySlug(property));
  };
  const plan = () => { setSelectedState(null); setEnquiry(true); setSaved(false); };
  const close = () => { setSelectedState(null); setEnquiry(false); setSaved(false); };

  return <>
    <SiteHeader onPlanVisit={plan}/>
    <main id="main">
      <section className="properties section" id="portfolio">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PORTFOLIO</div>
            <h2>{config.label}<br/><em>for your next chapter.</em></h2>
          </div>
          <button className="text-link" onClick={plan}>Plan a site visit <ArrowUpRight size={18}/></button>
        </div>
        <div className="property-toolbar">
          <span>{config.copy}</span>
          <span><Icon size={14}/> {filtered.length} sample properties</span>
        </div>
        <div className="portfolio-status-tabs" role="tablist" aria-label={`${config.label} project status`}>
          <button
            type="button"
            role="tab"
            aria-selected={status === 'ongoing'}
            className={status === 'ongoing' ? 'active' : ''}
            onClick={() => setStatus('ongoing')}
          >
            Ongoing
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={status === 'completed'}
            className={status === 'completed' ? 'active' : ''}
            onClick={() => setStatus('completed')}
          >
            Completed
          </button>
        </div>
        <div role="status" className="text-xs text-stone-600 mb-4">
          {propertiesQuery.isError ? 'The catalogue is temporarily unavailable. Showing sample properties.' : propertiesQuery.isFetching ? 'Refreshing the sample catalogue...' : ''}
        </div>
        <div className="property-grid">
          {filtered.map((property) => <PropertyCard key={property.name} property={property} onSelect={setSelected}/>)}
        </div>
        {!filtered.length && <div className="empty-state">
          <Icon size={32}/>
          <h3>{status === 'ongoing' ? config.label : `Completed ${config.label}`} details are coming soon.</h3>
          <p>{status === 'ongoing' ? 'Plan a visit and our team will help you with the latest availability.' : 'Completed projects will be added here as the portfolio is updated.'}</p>
          <button className="button" onClick={plan}>Talk to us <MoveUpRight size={18}/></button>
        </div>}
        <p className="sample-note">A preview of what is possible. Listings, areas, and images are illustrative, not live offers.</p>
      </section>
    </main>
    {(selected || enquiry) && <VisitDialog selected={selected} saved={saved} onClose={close} onPlan={plan} onSaved={() => setSaved(true)}/>}
  </>;
}
