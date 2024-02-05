// hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:3001";

const useWebSocket = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

  }, []);

  return socket;
};

export default useWebSocket;
