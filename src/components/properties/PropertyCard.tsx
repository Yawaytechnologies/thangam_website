import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import type { Property } from '../../types/property';

export function PropertyCard({ property: p, onSelect }: { property: Property; onSelect: (property: Property) => void }) {
  return (<article className="property-card"><button className="property-image" onClick={() => onSelect(p)} aria-label={`View ${p.name}`}><img src={p.image} alt={`${p.type} concept for ${p.name}`} loading="lazy"/><span className="property-tag">{p.type}</span><span className="round-arrow"><ArrowUpRight size={20}/></span></button><div className="property-meta"><MapPin size={13}/>{p.location}<span>ILLUSTRATIVE</span></div><h3><button onClick={() => onSelect(p)}>{p.name}</button></h3><p>{p.note}</p><div className="property-footer"><span>{p.area} <small>sq. ft.</small></span><button onClick={() => onSelect(p)}>Explore <ArrowRight size={15}/></button></div></article>);
}
