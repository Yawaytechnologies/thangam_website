import { create } from 'zustand';

type Filter = { location: string; type: string };
export const usePropertyFilters = create<{
  filter: Filter;
  setFilter: (filter: Filter) => void;
}>((set) => ({
  filter: { location: 'All locations', type: 'All properties' },
  setFilter: (filter) => set({ filter }),
}));
