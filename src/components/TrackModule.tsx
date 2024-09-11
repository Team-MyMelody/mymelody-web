'use client';

import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import { useEffect, useState } from 'react';

interface CleanTrackInfo {
  name: string;
  artist: string;
  isrc: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

const TrackModule = ({ isrc }: { isrc: string }) => {
  const [track, setTrack] = useState<CleanTrackInfo>({
    name: '',
    artist: '',
    isrc: '',
    previewUrl: '',
    imageUrl: '',
    albumName: '',
  });

  // 노래정보 받아오기
  const { trackDetail, isLoading, error } = useGetTrackInfo(isrc);

  useEffect(() => {
    if (!isLoading && trackDetail) {
      const cleanTrackInfo = getCleanTrackInfo(trackDetail);
      setTrack(cleanTrackInfo);
    }
  }, [isLoading, trackDetail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading track info.</div>;
  }

  return (
    <div
      className="flex items-center p-2 border border-gray-300 rounded-md max-w-full"
      style={{ width: '300px' }}
    >
      <img
        src={track.imageUrl}
        alt={track.name}
        className="w-16 h-16 mr-2 rounded-md"
      />
      <div className="flex-1">
        <h3 className="m-0 text-lg">{track.name}</h3>
        <p className="my-1 text-gray-600">{track.artist}</p>
        <p className="my-1 text-gray-600">{track.albumName}</p>
        <audio src={track.previewUrl} className="w-full" controls>
          <track kind="captions" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default TrackModule;
