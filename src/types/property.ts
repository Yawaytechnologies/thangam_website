export interface Property {
  name: string;
  location: string;
  type: string;
  status?: 'ongoing' | 'completed';
  area: string;
  image: string;
  note: string;
  description: string;
}
