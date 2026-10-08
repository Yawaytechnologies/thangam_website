import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
const questions = [
  ['How do I choose the right property?', 'Start with your preferred location, budget, and intended use. Consider access, nearby amenities, and the space you need. Our enquiry planner can help you prepare for a conversation.'],
  ['Can I arrange a site visit?', 'Yes. Select a property and use the visit planner to prepare your preferred date and contact details. In this preview, the enquiry is saved on your device and is not sent to the sales team.'],
  ['What documents should I review?', 'Ask the seller for the title documents, applicable layout approvals, encumbrance details, and a clear breakdown of costs. Have the property documents reviewed by a qualified local professional before making a commitment.'],
  ['Are these properties available to purchase?', 'The listings and photographs on this preview are illustrative. Availability, pricing, approvals, and exact specifications must be supplied and verified before this website is launched.'],
];


export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (      <section className="faq section" id="faq"><div><div className="eyebrow">A LITTLE MORE CLARITY</div><h2>Good questions.<br/><em>Clear answers.</em></h2><p>Taking the first step should feel simple.</p></div><div>{questions.map(([question, answer], i) => <div className="faq-item" key={question}><h3><button aria-expanded={openFaq === i} aria-controls={`answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{question}{openFaq === i ? <Minus size={18}/> : <Plus size={18}/>}</button></h3><div id={`answer-${i}`} hidden={openFaq !== i}><p>{answer}</p></div></div>)}</div></section>
);
}
