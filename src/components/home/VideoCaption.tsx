import { ArrowUpRight } from 'lucide-react';

export function VideoCaption() {
  return <div className="video-caption">
    <p className="video-caption-label">SRI THANGAM HOUSING</p>
    <h1>Your future starts with<br/><span>a place to call home.</span></h1>
    <p className="video-caption-description">Space for your dreams. A setting for your next chapter.<br/>Explore plots, homes, and new possibilities with us.</p>
    <a className="button cream" href="#plots">Explore properties <ArrowUpRight size={18}/></a>
  </div>;
}
