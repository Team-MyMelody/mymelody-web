import axios, { AxiosResponse } from 'axios';

// accessToken 요청
export const getSpotifyToken = async () => {
  try {
    // 요청 본문을 정의합니다.
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append(
      'client_id',
      `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`
    );
    requestBody.append(
      'client_secret',
      `${process.env.NEXT_PUBLIC_SPOTIFY_SECRET_KEY}`
    );

    // Spotify API로 POST 요청을 보냅니다.
    const response: AxiosResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // 응답에서 액세스 토큰을 추출합니다.
    const accessToken = response.data.access_token;
    console.log('액세스 토큰 저장:', accessToken);

    //accessToken ls 에 저장
    localStorage.setItem('spotifyAccessToken', accessToken);

    return accessToken;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
