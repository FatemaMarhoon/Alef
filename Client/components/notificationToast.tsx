import React from 'react';
import { useToasts } from 'react-toast-notifications';

const NotificationToast = () => {
  const { addToast } = useToasts();

  React.useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket('ws://localhost:3001'); // Replace with your server's WebSocket URL

    // Listen for WebSocket events
    socket.addEventListener('message', (event) => {
      try {
        const notificationData = JSON.parse(event.data);
        showNotification(notificationData);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const showNotification = (notificationData) => {
    const { title, content } = notificationData;

    addToast(
      <div className="bg-blue-500 text-white p-4 rounded-md shadow-md">
        <strong>{title}</strong>
        <p>{content}</p>
      </div>,
      { appearance: 'success', autoDismiss: true }
    );
  };

  return null;
};

export default NotificationToast;
