interface CleanTrackInfo {
  name: string;
  artist: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

export const cleanTrackData = (data: any): CleanTrackInfo[] => {
  // Check if data and data.tracks exist
  if (!data) {
    console.log('음악 데이터 없음');
    return [];
  }

  return data.slice(0, 5).map((track: any) => ({
    name: track.name,
    artist: track.artists[0].name, // 첫 번째 아티스트만 선택
    previewUrl: track.preview_url,
    imageUrl: track.album.images[0].url, // 앨범 이미지 중 가장 큰 이미지 선택
    albumName: track.album.name,
  }));
};
