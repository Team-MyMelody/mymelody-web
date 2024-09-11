import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import KakaoMap from '@/components/Map/KakaoMap';
import SpotifyTesting from '@/components/SpotifyTesting';
import { ChakraProvider, useEditable } from '@chakra-ui/react';
export default function Page() {
  return (
    <>
      <ChakraProvider>
        <KakaoMap />
        <SpotifyTesting />
      </ChakraProvider>
    </>
  );
}
