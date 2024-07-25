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
import ISRCForm from '../ISRCForm';
import usePinStore from '@/utils/store';

interface EventMarkerContainerProps {
  position: {
    lat: number;
    lng: number;
  };
  isrc: string;
}

const KakaoMap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locationInfo, setLocationInfo, updateLocationInfo } =
    useLocationInfo(); //현위치 전역변수 받아오기
  const [centerLocation, setCenterLocation] = useState(locationInfo); //포커싱 위치
  const pinList = usePinStore((state) => state.pinList); // pinList 가져오기

  useEffect(() => {
    //토큰 발행
    getSpotifyToken();

    // Initial location update
    updateLocationInfo();

    const handlePosition = (pos: GeolocationPosition) => {
      console.log('현위치 업데이트!');

      const newLat = pos.coords.latitude;
      const newLng = pos.coords.longitude;

      // 위치 변화가 일정 거리 이상일 때만 상태 업데이트
      const distance = getDistance(
        locationInfo.lat,
        locationInfo.lng,
        newLat,
        newLng
      );
      if (distance > 10) {
        // 10미터 이상일 때만 포커싱 위치 업데이트
        setCenterLocation({ lat: newLat, lng: newLng });
        setLocationInfo({ lat: newLat, lng: newLng });
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      (error) => {
        console.error('Error fetching geolocation: ', error);
      }
    );

    // // Cleanup on unmount
    // return () => {
    //   navigator.geolocation.clearWatch(watchId);
    // };
  }, []);

  const getDistance = (
    lat1: number | null,
    lng1: number | null,
    lat2: number,
    lng2: number
  ): number => {
    if (lat1 === null || lng1 === null) return Infinity;

    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  //카카오맵 불러오기
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS || '',
  });

  //마커 이벤트
  const EventMarkerContainer = ({
    position,
    isrc,
  }: EventMarkerContainerProps) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        //마커 이미지
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
          setCenterLocation(position);
          // map.panTo(marker.getPosition());
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

  //현위치 클릭 시 이벤트
  const handleCurrentLocClick = () => {
    console.log('현위치 클릭!');
    setIsOpen(!isOpen);
  };

  //핀추가
  const addPin = usePinStore((state) => state.addPin);

  return (
    <>
      {isOpen && <ISRCForm />}
      <Map
        center={centerLocation} //지도 중심의 좌표
        style={{ width: '500px', height: '400px' }} //지도크기
        level={3} //지도 확대 레벨
      >
        {/* 현 위치 마커 */}
        <MapMarker
          position={locationInfo}
          onClick={() => {
            handleCurrentLocClick();
          }}
        />

        {/* 다중마커 이벤트 */}
        {pinList.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            isrc={value.isrc}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
