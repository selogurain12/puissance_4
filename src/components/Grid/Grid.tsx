import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styles } from './Grid.style';
import useWebSocket from '../useWebSocket';

interface Props {
  rows: number;
  cols: number;
}
const Grid:React.FC<Props> = ({ rows, cols }) => {
  const arrRows = Array.from({ length: rows }, (_, index) => index + 1);
  const arrCols = Array.from({ length: cols }, (_, index) => index + 1);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [currentCase, setCurrentCase] = useState('');
  const { gridContainer, rowContainer, colContainer } = styles;
  const handleClick = () => {
    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
  };
  const socket = useWebSocket();

  useEffect(() => {
    if(socket) {
      socket.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
      });

      socket.on('message', (message: any) => {
        console.log('Message reçu:', message);
      });
    }
  }, [socket]);
  const Square = () => (
    <Box sx={colContainer} onClick={() => handleClick()}>
      {currentCase === '' && currentPlayer && <img src={`../src/assets/${currentPlayer}.svg`} alt={currentPlayer} />}
    </Box>
  );
  return (
    <Box sx={gridContainer}>
      {arrRows.map((row) => (
        <Stack key={row} sx={rowContainer} direction="row">
          {arrCols.map((col) => (
            <Square key={col} />

          ))}
        </Stack>
      ))}
    </Box>
  );
};
export default Grid;
