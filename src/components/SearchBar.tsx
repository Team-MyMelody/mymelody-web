'use client';

import { useGetTrackInfoByName } from '@/apis/api/get/useGetTrackInfoByName';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  musicName: string;
  setMusicName: React.Dispatch<React.SetStateAction<string>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  musicName,
  setMusicName,
  isListOpen,
  setIsListOpen,
}) => {
  const [tempMusicName, setTempMusicName] = useState('');
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Entered value:', tempMusicName);
      //value값 저장
      setMusicName(tempMusicName);
      //value값 초기화
      setTempMusicName('');
      //음악정보 검색하도록 리스트 오픈
      setIsListOpen(true);
    }
  };

  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="what's your melody?"
          value={tempMusicName}
          onChange={(event) => {
            setTempMusicName(event.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
      </InputGroup>
    </>
  );
};
