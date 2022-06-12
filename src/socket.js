import { io } from 'socket.io-client';

const URL = 'https://neuro-support.herokuapp.com';
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export const connectingSocket = (user) => {
  socket.auth = {
    id: user?.socketId,
  };

  socket.connect();
};

export default socket;
