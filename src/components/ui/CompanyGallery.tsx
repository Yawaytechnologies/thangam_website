import { ArrowUpRight } from 'lucide-react';
import { companyPhotos } from '../../assets/company-photos';
import '../../styles/company-gallery.css';

export function CompanyGallery({ category }: { category: 'company' | 'project' }) {
  const photos = companyPhotos.filter(photo => photo.category === category);
  if (!photos.length) return null;
  const isCompany = category === 'company';
  return <section className="company-gallery section" aria-labelledby={`${category}-gallery-title`}>
    <div className="company-gallery-heading">
      <p className="eyebrow">{isCompany ? 'OUR PEOPLE & MOMENTS' : 'A CLOSER LOOK'}</p>
      <h2 id={`${category}-gallery-title`}>{isCompany ? 'The people behind the journey.' : 'From the entrance to the site.'}</h2>
      <p>{isCompany ? 'A glimpse of company gatherings, project presentations, and shared conversations.' : 'Project photographs and moments from a site visit.'}</p>
    </div>
    <div className={`company-gallery-grid company-gallery-grid--${category}`}>
      {photos.map(photo => <figure className="company-gallery-card" key={photo.id}>
        <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full photo: ${photo.title}`}>
          <img src={photo.src} alt={photo.alt} loading="lazy"/>
          <span className="company-gallery-expand" aria-hidden="true"><ArrowUpRight size={18}/></span>
        </a>
        <figcaption>{photo.title}</figcaption>
      </figure>)}
    </div>
  </section>;
}
