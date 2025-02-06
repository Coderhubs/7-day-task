import { create } from "zustand"

interface FilterState {
  types: string[]
  capacity: string[]
  maxPrice: number
  setFilters: (filters: Partial<FilterState>) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  types: [],
  capacity: [],
  maxPrice: 100,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}))

