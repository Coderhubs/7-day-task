import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoriteCar = {
  id: number;
  name: string;
  type: string;
  image: string;
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  price: number;
  discountedPrice?: number;
};

type FavoriteStore = {
  favorites: FavoriteCar[];
  addFavorite: (car: FavoriteCar) => void;
  removeFavorite: (carId: number) => void;
  isFavorite: (carId: number) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (car) => 
        set((state) => ({
          favorites: [...state.favorites, car]
        })),
      removeFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.filter((car) => car.id !== carId)
        })),
      isFavorite: (carId) =>
        get().favorites.some((car) => car.id === carId),
    }),
    {
      name: 'favorites-storage',
    }
  )
); 