import { Box, Stack } from '@mui/material'
import {styles} from '../styles/Grid.style'
import useWebSocket from './useWebSocket';
import { useEffect } from 'react';

export default function Grid() {
    const socket = useWebSocket();

  useEffect(() => {
    if(socket) {
      socket.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
      });

      socket.on('message', (message: any) => {
        console.log('Message reçu:', message);
      });

      socket.emit('message', 'Hello Server');
    }
  }, [socket]);
    const {gridContainer, rowContainer, colContainer} = styles
    const rows = [1, 2, 3, 4, 5, 6]
    const cols = [1, 2, 3, 4, 5, 6, 7]
    return (
        <Box sx={gridContainer}>
            {rows.map((row) => {
                return (
                    <Stack sx={rowContainer} direction={'row'}>
                        {cols.map((col) => {
                            return (
                                <Box sx={colContainer}>
                                    X
                                </Box>
                            )
                        })}
                    </Stack>
                )
            })}
        </Box>
    )
}