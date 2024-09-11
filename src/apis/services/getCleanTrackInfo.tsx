interface Artist {
  name: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
}

interface RawTrackInfo {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface CleanTrackInfo {
  name: string;
  artist: string;
  isrc: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

export const getCleanTrackInfo = (
  rawTrackInfo: RawTrackInfo[]
): CleanTrackInfo => {
  const { name, artists, external_ids, preview_url, album } = rawTrackInfo[0];

  return {
    name,
    artist: artists[0]?.name || '',
    isrc: external_ids.isrc,
    previewUrl: preview_url,
    imageUrl: album.images[0]?.url || '',
    albumName: album.name,
  };
};
