import { useEffect } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

interface ServerEvents {
  'properties:updated': () => void;
}

// Opt in when a Socket.IO server is available; no connection attempts otherwise.
export const socket: Socket<ServerEvents> = io(import.meta.env.VITE_SOCKET_URL || undefined, {
  autoConnect: false,
  reconnectionAttempts: 5,
});

export function usePropertyUpdates() {
  const client = useQueryClient();
  useEffect(() => {
    if (!import.meta.env.VITE_SOCKET_URL) return;
    const refresh = () => { void client.invalidateQueries({ queryKey: ['properties'] }); };
    socket.on('properties:updated', refresh);
    socket.on('connect', refresh);
    socket.connect();
    return () => {
      socket.off('properties:updated', refresh);
      socket.off('connect', refresh);
      socket.disconnect();
    };
  }, [client]);
}
