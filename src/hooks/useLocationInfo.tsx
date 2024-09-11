import { create } from 'zustand';

interface locationInfoType {
  lat: number;
  lng: number;
}

interface LocationInfoState {
  locationInfo: locationInfoType;
}

interface LocationInfoActions {
  setLocationInfo: (locationInfo: locationInfoType) => void;
  updateLocationInfo: () => void;
}

const defaultState = { lat: 37.5513, lng: 126.9246 }; //홍익대 위치 default

const useLocationInfo = create<LocationInfoState & LocationInfoActions>(
  (set) => ({
    locationInfo: defaultState,
    setLocationInfo: (locationInfo: locationInfoType) => {
      set({ locationInfo });
    },
    updateLocationInfo: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            set({ locationInfo: { lat: latitude, lng: longitude } });
          },
          (error) => {
            console.error('Error fetching geolocation: ', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
  })
);

export default useLocationInfo;
