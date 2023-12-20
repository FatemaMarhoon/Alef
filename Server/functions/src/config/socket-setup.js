const socketIo = require('socket.io');

let io;
const userSocketMap = {};

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    // Listen for the login event
    socket.on('login', ({ userID }) => {
      // Associate the socket with the user ID
      userSocketMap[userID] = socket.id;
      console.log(`User ${userID} logged in and associated with socket ID: ${socket.id}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const userId = Object.keys(userSocketMap).find((key) => userSocketMap[key] === socket.id);
      if (userId) {
        console.log(`User ${userId} disconnected`);
        // Remove the association when the user disconnects
        delete userSocketMap[userId];
      }
    });
  });

  return io;
}

module.exports = {
  initializeSocket,
  userSocketMap,
  getIo: () => io, // Getter function to access io instance
};
