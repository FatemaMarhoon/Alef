import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { currentUserId } from '@/services/authService';

const NotificationToast = () => {
  const [notification, setNotification] = useState<{ title: string, body: string } | null>(null);
  const [userID, setUserID] = useState("");

  //get userid 
  async function getUserID() {
    await currentUserId().then((id) => { setUserID(String(id)) })
  }
  useEffect(() => {
    getUserID();
  }, []);

  useEffect(() => {
    //only connect to web socket if we have a logged-in user 
    if (userID) {
      const socket = io('https://us-central1-alef-229ac.cloudfunctions.net/app');

      socket.on('connect', () => {
        // Pass the user ID to the server once the connection is established
        socket.emit('login', { userID });
        console.log(userID + " connected to the socket")
      });

      // Handle incoming messages
      socket.on('notification', (data) => {
        const { title, body } = data;
        setNotification({ title, body });
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userID]);

  useEffect(() => {
    if (notification) {
      const notificationSound = new Audio('notification-sound.mp3');
      notificationSound.play();

      // Generate a unique ID for each notification
      const notificationId = `notification-${new Date().getTime()}`;

      toast.custom((t) => (
        <div
          key={notificationId}
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:bg-boxdark-2 dark:text-bodydark`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.body}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>        </div>
      ));
    }
  }, [notification]);

  return (
    <>
    </>
  );
};

export default NotificationToast;
