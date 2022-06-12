import { io } from 'socket.io-client';

const URL = 'https://neuro-support-backend.vercel.app';
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export const connectingSocket = (user) => {
  socket.auth = {
    id: user?.socketId,
  };
  console.log(socket.auth, 'this is auth');
  // socket.connectedUsers = {};
  // socket.auth = {id: res.user?.socketId};
  socket.connect();
};

export default socket;
