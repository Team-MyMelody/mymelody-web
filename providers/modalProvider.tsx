import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

// Define the Props interface
interface Props {
  title: string;
  body: ReactNode;
}

// Define the ModalProviderProps interface
interface ModalProviderProps {
  children: ReactNode;
}

// Define the ModalContextType interface
interface ModalContextType {
  content: Props | null;
  showModal: (props: Props) => void;
  hideModal: () => void;
}

// Create the context
const modalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook to use the modal context
export function useModal(): ModalContextType {
  const context = useContext(modalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

// ModalProvider component
export function ModalProvider({ children }: ModalProviderProps) {
  const [content, setContent] = useState<Props | null>(null);

  const showModal = (props: Props) => {
    setContent(props);
  };

  const hideModal = () => {
    setContent(null);
  };

  const value = useMemo(
    () => ({
      showModal,
      hideModal,
      content,
    }),
    [content]
  );

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
}
