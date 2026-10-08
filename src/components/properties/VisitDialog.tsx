import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import type { Property } from '../../types/property';

const EnquiryForm = React.lazy(() => import('../forms/VisitEnquiryForm').then(module => ({ default: module.EnquiryForm })));

export function VisitDialog({ selected, saved, onClose: close, onPlan: plan, onSaved }: {
  selected: Property | null; saved: boolean; onClose: () => void; onPlan: () => void; onSaved: () => void;
}) {
  return <Dialog onClose={close}>{selected ? <><img className="dialog-image" src={selected.image} alt={selected.name}/><div className="dialog-content"><div className="eyebrow">{selected.type} - SAMPLE LISTING</div><h2 id="dialog-title">{selected.name}</h2><p>{selected.description}</p><p><strong>{selected.location}</strong> - {selected.area} sq. ft.</p><p className="sample-note">Illustrative concept only. Price, availability, and approvals have not been verified.</p><button className="button" onClick={plan}>Prepare a visit enquiry <ArrowUpRight size={17}/></button></div></> : <div className="dialog-content"><div className="eyebrow">LET'S MAKE A BEGINNING</div><h2 id="dialog-title">Plan your <em>first visit.</em></h2>{saved ? <div role="status"><h3>Your enquiry is saved on this device.</h3><p>This preview does not send enquiries to the sales team. Your details are stored in this browser only.</p><button className="button" onClick={close}>Done <ArrowRight size={16}/></button></div> : <React.Suspense fallback={<p role="status">Loading visit planner...</p>}><EnquiryForm onSaved={onSaved}/></React.Suspense>}</div>}</Dialog>;
}
