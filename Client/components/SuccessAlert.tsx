import React from 'react';
import { useSuccessMessageContext } from '../components/SuccessMessageContext';

interface AlertProps {
  message: string;
}

const SuccessAlert: React.FC<AlertProps> = ({ message }) => {
  const { clearSuccessMessage } = useSuccessMessageContext();

  const handleDismiss = () => {
    clearSuccessMessage(); // Call the function to clear the success message from the context
  };

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center bg-success bg-opacity-5 mb-3 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
      <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
        <div className="text-success">
          <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div className="text-sm text-success font-medium ml-3">{message}</div>
      </div>
      <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </div>
    </div>
    // <div className="bg-opacity-10 text-success bg-success px-4 py-3 rounded relative mb-3" role="alert">
    //   <strong className="font-bold">{message}</strong>
    //   <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    //     <svg
    //       className="fill-current h-6 w-6 text-green-500 cursor-pointer"
    //       role="button"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 20 20"
    //       onClick={handleDismiss} // Call the handleDismiss function on click
    //     >
    //       <title>Close</title>
    //       <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
    //     </svg>
    //   </span>
    // </div>
  );
};

export default SuccessAlert;