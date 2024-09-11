'use client';
import useLocationInfo from '@/hooks/useLocationInfo';
import usePinStore from '@/utils/store';
import React, { useState } from 'react';

export const ISRCForm=()=> {
  const [isrc, setIsrc] = useState('');
  const { locationInfo, setLocationInfo } = useLocationInfo();
  const addPin = usePinStore((state) => state.addPin);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ISRC Code:', isrc);
    addPin({ isrc: isrc, latlng: locationInfo });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isrc"
            >
              ISRC Code
            </label>
            <input
              type="text"
              id="isrc"
              value={isrc}
              onChange={(e) => setIsrc(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter ISRC code"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

