import { z } from 'zod';
import { apiGet } from './http';
import type { Property } from '../types/property';

const propertiesSchema = z.array(z.object({
  name: z.string(), location: z.string(), type: z.string(), area: z.string(),
  status: z.enum(['ongoing', 'completed']).optional(),
  image: z.url(), note: z.string(), description: z.string(),
}));

export async function getProperties(signal?: AbortSignal): Promise<Property[]> {
  return propertiesSchema.parse(await apiGet<unknown>('/properties', signal));
}
