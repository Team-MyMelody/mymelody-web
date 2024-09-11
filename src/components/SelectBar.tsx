import { useGetTrackInfoByName } from '@/apis/api/get/useGetTrackInfoByName';
import { cleanTrackData } from '@/apis/services/getCleanTrackList';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { SimpleGrid, Image, Text, Box } from '@chakra-ui/react';

interface SelectBarProps {
  musicName: string;
}

export const SelectBar: React.FC<SelectBarProps> = ({ musicName }) => {
  const [cleanedTrackData, setCleanedTrackData] = useState<any[]>([]);

  // Fetch track details
  const { trackDetail, isLoading, error } = useGetTrackInfoByName(musicName);

  useEffect(() => {
    if (trackDetail) {
      // Clean and set track data
      console.log(trackDetail);
      const cleanedData = cleanTrackData(trackDetail);
      console.log(cleanedData);
      setCleanedTrackData(cleanedData);
    }

    if (error) {
      console.error('Error fetching track details:', error);
    }
  }, [trackDetail, error]);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {cleanedTrackData && cleanedTrackData.length > 0 ? (
        cleanedTrackData.map((track, index) => (
          <Card
            key={index}
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              src={track.imageUrl}
              alt={track.name}
              objectFit="cover"
              maxW={{ base: '100%', sm: '150px' }}
            />
            <Box p={4}>
              <CardHeader>
                <Text fontSize="md" fontWeight="bold">
                  {track.name}
                </Text>
                <Text fontSize="s" color="gray.500">
                  {track.artist}
                </Text>
              </CardHeader>
              <CardBody>
                {track.previewUrl && (
                  <audio controls>
                    <track kind="captions" />
                    <source src={track.previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </CardBody>
            </Box>
          </Card>
        ))
      ) : (
        <Text>No track data found.</Text>
      )}
    </SimpleGrid>
  );
};
