import { useQuery } from '@tanstack/react-query';
import { spotifyApiInstance } from '@/apis';

// 곡명으로 track정보 호출
export const useGetTrackInfoByName = (name: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trackDetail', name],
    queryFn: async () => {
      const res = await spotifyApiInstance.get(
        `search?type=track&market=KR&q=%20track:${name}`
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
