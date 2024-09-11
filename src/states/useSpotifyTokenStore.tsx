import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SpotifyTokenState {
  spotifyToken: string;
  setSpotifyToken: (spotifyToken: string) => void;
}

export const useSpotifyTokenStore = create<SpotifyTokenState>()(
  typeof window !== 'undefined'
    ? persist(
        (set) => ({
          spotifyToken: '',
          setSpotifyToken: (newSpotifyToken: string) =>
            set({ spotifyToken: newSpotifyToken }),
        }),
        {
          name: 'spotifyAccessToken',
          storage: createJSONStorage(() => localStorage),
        }
      )
    : (set) => ({
        spotifyToken: '',
        setSpotifyToken: (newSpotifyToken: string) =>
          set({ spotifyToken: newSpotifyToken }),
      })
);
