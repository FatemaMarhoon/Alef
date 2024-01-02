import React, { useEffect, useState } from 'react';
import { useSuccessMessageContext } from '../components/SuccessMessageContext';
import { usePathname } from 'next/navigation';

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
       <button onClick={handleDismiss}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> 
      </div>
    </div>
  );
};

export default SuccessAlert;