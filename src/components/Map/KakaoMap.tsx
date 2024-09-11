'use client';
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  useKakaoLoader,
  useMap,
} from 'react-kakao-maps-sdk';
import useLocationInfo from '@/hooks/useLocationInfo';
import { useEffect, useState } from 'react';
import TrackModule from '../TrackModule';
import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import usePinStore from '@/utils/store';
import { getDistance } from '@/utils/distance';
import { MusicSelectModal } from '../MusicSelectModal';
import { useDisclosure } from '@chakra-ui/react';

interface EventMarkerContainerProps {
  position: {
    lat: number;
    lng: number;
  };
  isrc: string;
}

const KakaoMap = () => {
  const { locationInfo, setLocationInfo, updateLocationInfo } =
    useLocationInfo(); // 현위치 전역변수 받아오기
  const [currentLocation, setCurrentLocation] = useState(locationInfo); // 현위치 마커용 상태
  const pinList = usePinStore((state) => state.pinList); // pinList 가져오기

  useEffect(() => {
    // 토큰 발행
    getSpotifyToken();

    // Initial location update
    updateLocationInfo();

    // Watch position
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newLat = pos.coords.latitude;
        const newLng = pos.coords.longitude;
        const distance = getDistance(
          locationInfo.lat,
          locationInfo.lng,
          newLat,
          newLng
        );

        // if (distance > 10) {
        //   // 10미터 이상일 때만 업데이트
        //   console.log('10미터이상');
        //   setLocationInfo({ lat: newLat, lng: newLng });
        //   setCurrentLocation({ lat: newLat, lng: newLng });
        // }
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 카카오맵 불러오기
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS || '',
  });

  // 마커 이벤트
  const EventMarkerContainer = ({
    position,
    isrc,
  }: EventMarkerContainerProps) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // 마커 이미지
        image={{
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
          size: {
            width: 24,
            height: 35,
          },
        }}
        clickable={true}
        onClick={(marker) => {
          console.log('터치');
          setIsVisible(!isVisible);
          map.panTo(marker.getPosition());
        }}
      >
        {isVisible && (
          <CustomOverlayMap position={position}>
            <TrackModule isrc={isrc} />
          </CustomOverlayMap>
        )}
      </MapMarker>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Map
        center={currentLocation} // 지도 중심의 좌표
        style={{ width: '500px', height: '400px' }} // 지도크기
        level={3} // 지도 확대 레벨
      >
        {/* 현 위치 마커 */}
        <MapMarker position={currentLocation} onClick={onOpen} />

        {/* 다중마커 이벤트 */}
        {pinList.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            isrc={value.isrc}
          />
        ))}
        {/* 음악 검색 모달 */}
        <MusicSelectModal isOpen={isOpen} onClose={onClose} />
      </Map>
    </>
  );
};

export default KakaoMap;
