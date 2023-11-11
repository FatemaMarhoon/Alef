import React, { useEffect } from 'react';

const TemporarySuccessMessage = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Close the success message after a certain duration
        }, 3000); // Adjust the duration as needed (in milliseconds)

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center h-16 bg-green-500 text-white">
            <p className="text-lg">{message}</p>
        </div>
    );
};

export default TemporarySuccessMessage;
