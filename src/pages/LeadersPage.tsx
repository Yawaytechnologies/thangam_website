import { useEffect } from 'react';
import { ArrowUpRight, Mail, MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { companyPhotos } from '../assets/company-photos';
import chairmanPortrait from '../assets/company/image6-clean.png';
import { SiteHeader } from '../components/layout/SiteHeader';
import '../styles/leaders.css';

const directors = [
  'Praveen Raj T',
  'Mohammed Manaf',
  'Chandramouli',
  'Ganapathy',
  'Lekshmanan',
  'Namburakku Saroja',
  'Mohamed Jawahar M',
  'Sivakumar Nagarajan',
  'Bala Jayanthi P',
  'Rajam Kesavan K',
  'Bharathi G',
  'Subhashini K',
  'Maharajan M',
  'Kavya Varshini T',
  'Roja N',
];

const leadersBanner = companyPhotos.find((photo) => photo.id === 'community-meeting');

function initials(name: string) {
  const parts = name.split(/\s+/);
  return (parts.length > 1 ? parts.map((part) => part[0]).slice(0, 2).join('') : parts[0].slice(0, 2)).toUpperCase();
}

export function LeadersPage() {
  const navigate = useNavigate();
  const planVisit = () => navigate('/#contact');

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return <>
    <SiteHeader onPlanVisit={planVisit}/>
    <main id="main" className="leaders-page">
      <section className="leaders-hero" aria-labelledby="leaders-title">
        {leadersBanner && <img src={leadersBanner.src} alt={leadersBanner.alt} className="leaders-hero-image"/>}
        <div className="leaders-hero-shade"/>
        <div className="leaders-hero-copy"><span>PEOPLE BEHIND THE PROMISE</span><h1 id="leaders-title">Leaders</h1><i/></div>
      </section>

      <section className="leaders-intro" aria-labelledby="leaders-intro-title">
        <div className="leaders-intro-inner">
          <p className="leaders-kicker">SRI THANGAM HOUSING</p>
          <h2 id="leaders-intro-title">Our top notch chairman<br/>and directors</h2>
          <blockquote>“Meet our esteemed directors, each a seasoned professional with a proven track record in the real estate industry. With unwavering dedication to client satisfaction and a wealth of expertise, our directors are committed to guiding you through every aspect of your real estate journey with confidence and ease.”</blockquote>
        </div>
      </section>

      <section className="chairman-section" aria-labelledby="chairman-name">
        <div className="chairman-inner">
          <div className="chairman-photo-wrap"><img src={chairmanPortrait} alt="Dr. Thangaraj M, Chairman of Sri Thangam Housing" className="chairman-photo" loading="lazy"/></div>
          <div className="chairman-copy"><p className="leaders-kicker">LEADERSHIP</p><span className="chairman-role">CHAIRMAN &amp; MANAGING DIRECTOR</span><h2 id="chairman-name">Dr. Thangaraj M</h2><blockquote>“Avoid negativity and embrace a balanced approach, moving forward with dedication. A positive mindset brings success. Let optimism guide your journey.”</blockquote><a className="chairman-email" href="mailto:thangaraj.srithangamhousing@gmail.com"><Mail size={17}/> thangaraj.srithangamhousing@gmail.com <ArrowUpRight size={16}/></a></div>
        </div>
      </section>

      <section className="directors-section" aria-labelledby="directors-title">
        <div className="directors-heading"><div><p className="leaders-kicker">THE PEOPLE WHO GUIDE US</p><h2 id="directors-title">Our directors</h2></div><p>Meet the team helping guide every part of the Sri Thangam Housing journey.</p></div>
        <div className="directors-grid">{directors.map((name, index) => <article className="director-profile" key={name}><div className={`director-monogram tone-${index % 5}`} aria-hidden="true">{initials(name)}</div><div className="director-profile-copy"><p>DIRECTOR</p><h3>{name}</h3></div><span className="director-index">{String(index + 1).padStart(2, '0')}</span></article>)}</div>
        <a className="leaders-contact-link" href="/contact">Connect with our team <MoveUpRight size={17}/></a>
      </section>
    </main>
  </>;
}
