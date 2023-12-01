import { createContext, useContext, useState } from 'react';

type SuccessMessageContextType = {
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  clearSuccessMessage: () => void;
};

const SuccessMessageContext = createContext<SuccessMessageContextType>({
  successMessage: null,
  setSuccessMessage: () => {},
  clearSuccessMessage: () => {},
});

export function useSuccessMessageContext() {
  return useContext(SuccessMessageContext);
}

export function SuccessMessageProvider({ children }: { children: React.ReactNode }) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  return (
    <SuccessMessageContext.Provider value={{ successMessage, setSuccessMessage, clearSuccessMessage }}>
      {children}
    </SuccessMessageContext.Provider>
  );
}