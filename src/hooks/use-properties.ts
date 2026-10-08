import { useQuery } from '@tanstack/react-query';
import { getProperties } from '../api/properties';
import { sampleProperties } from '../assets/data/sample-properties';

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: ({ signal }) => getProperties(signal),
    placeholderData: sampleProperties,
  });
}
