import { useQuery } from '@tanstack/react-query';
import { spotifyApiInstance } from '@/apis';

// ISRC로 track정보 호출
export const useGetTrackInfo = (isrc: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trackDetail'],
    queryFn: async () => {
      const res = await spotifyApiInstance.get(
        `search?type=track&market=KR&q=%20isrc:${isrc}`
      );
      return res.data.tracks.items;
    },
  });

  return {
    trackDetail: data || null,
    isLoading,
    error,
  };
};
