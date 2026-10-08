import type { Property } from '../../types/property';

export const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const sampleProperties: Property[] = [
  { name: 'The Green Meadows', location: 'Chengalpattu', type: 'Residential plots', status: 'ongoing', area: '1,200 - 2,400', image: photo('photo-1470770841072-f978cf4d019e'), note: 'A little closer to nature', description: 'Imagine a home with space for a garden and room to grow. This residential plot concept brings a quieter pace to everyday life.' },
  { name: 'Urban Nest', location: 'Tambaram', type: 'Apartments', status: 'ongoing', area: '850 - 1,450', image: photo('photo-1545324418-cc1a3fa10c00'), note: 'Connected city living', description: 'An apartment concept planned around everyday convenience, access, and comfortable shared spaces for modern family life.' },
  { name: 'Gateway Square', location: 'Chengalpattu', type: 'Commercial land', status: 'ongoing', area: '2,400 - 7,200', image: photo('photo-1486406146926-c627a92ad1ab'), note: 'Visibility for growing plans', description: 'A commercial land concept with road access and flexible space for business, retail, or long-term investment possibilities.' },
  { name: 'The Orchard', location: 'Maduranthagam', type: 'Farm land', status: 'ongoing', area: '4,800 - 9,600', image: photo('photo-1500382017468-9049fed747ef'), note: 'Space to put down roots', description: 'Open landscapes and green surroundings shape this farm land concept. Explore the possibilities for your own countryside retreat.' },
  { name: 'Parkside Living', location: 'Chengalpattu', type: 'Villas', status: 'ongoing', area: '1,500 - 2,200', image: photo('photo-1600596542815-ffad4c1539a9'), note: 'Your everyday, elevated', description: 'A premium villa concept with generous living spaces, natural light, and a thoughtful connection to the outdoors.' },
];
