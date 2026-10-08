import communityMeeting from './company/image1.png';
import siteVisit from './company/image2.png';
import companyEvent from './company/image3.png';
import projectSignboard from './company/image4.png';
import brochurePresentation from './company/image5.png';

export interface CompanyPhoto {
  id: string;
  title: string;
  alt: string;
  category: 'company' | 'project';
  src: string;
}

export const companyPhotos: CompanyPhoto[] = [
  { id: 'company-event', src: companyEvent, title: 'Coming together', alt: 'A group holding property brochures at a Sri Thangam Housing event', category: 'company' },
  { id: 'brochure-presentation', src: brochurePresentation, title: 'Introducing new possibilities', alt: 'Four people presenting a Sri Thangam Housing project brochure', category: 'company' },
  { id: 'community-meeting', src: communityMeeting, title: 'Conversations that connect us', alt: 'A speaker addressing attendees at an indoor Sri Thangam Housing meeting', category: 'company' },
  { id: 'project-signboard', src: projectSignboard, title: 'At the project entrance', alt: 'Blue Sri Thangam Housing project signboard at the site entrance', category: 'project' },
  { id: 'site-visit', src: siteVisit, title: 'Exploring the site together', alt: 'A group gathered during an outdoor property site visit', category: 'project' },
];

export const companyStoryPhoto = companyPhotos.find(photo => photo.id === 'brochure-presentation');
