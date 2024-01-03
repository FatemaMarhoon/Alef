import { createContext, useContext, useState } from 'react';

type SuccessMessageContextType = {
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  clearSuccessMessage: () => void;
};

const SuccessMessageContext = createContext<SuccessMessageContextType>({
  successMessage: null,
  setSuccessMessage: () => { },
  clearSuccessMessage: () => { },
});

export function useSuccessMessageContext() {
  return useContext(SuccessMessageContext);
}

export function SuccessMessageProvider({ children }: { children: React.ReactNode }) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };


  const setSuccessMessageWithTimer = (message: string | null) => {
    setSuccessMessage(message);

    if (message) {
      // Set a timer to clear the success message after 5 seconds
      setTimeout(() => {
        clearSuccessMessage();
      }, 10000);
    }
  };


  return (
    <SuccessMessageContext.Provider value={{ successMessage, setSuccessMessage: setSuccessMessageWithTimer, clearSuccessMessage }}>
      {children}
    </SuccessMessageContext.Provider>
  );
}