// store.ts
import create from 'zustand';

interface Pin {
  isrc: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

interface PinStore {
  pinList: Pin[];
  addPin: (newPin: Pin) => void;
}

const usePinStore = create<PinStore>((set) => ({
  pinList: [
    {
      isrc: 'US5TA2300179',
      latlng: { lat: 37.55543673765699, lng: 126.90673385881081 },
    },
    {
      isrc: 'USA2P2230223',
      latlng: { lat: 37.55428413833823, lng: 126.90759539909989 },
    },
    {
      isrc: 'USUM71407116',
      latlng: { lat: 37.55370364774336, lng: 126.9027976789222 },
    },
    {
      isrc: 'USA2P2414844',
      latlng: { lat: 37.55720029242072, lng: 126.9037438152235 },
    },
  ],
  addPin: (newPin) => set((state) => ({ pinList: [...state.pinList, newPin] })),
}));

export default usePinStore;
