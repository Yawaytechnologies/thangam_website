import type { Property } from '../types/property';

export const propertySlug = (property: Property) => property.name.toLowerCase().replace(/\s+/g, '-');
