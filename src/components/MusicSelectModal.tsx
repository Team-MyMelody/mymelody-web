import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { SelectBar } from './SelectBar';

interface MusicSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicSelectModal: React.FC<MusicSelectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isListOpen, setIsListOpen] = useState(false); //음악정보리스트 열람 여부
  const [musicName, setMusicName] = useState(''); //검색데이터

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>멜로디 검색</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchBar
            musicName={musicName}
            setMusicName={setMusicName}
            isListOpen={isListOpen}
            setIsListOpen={setIsListOpen}
          />
          {isListOpen && <SelectBar musicName={musicName}></SelectBar>}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
