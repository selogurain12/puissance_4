import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import style from './Grid.style';
import useWebSocket from '../useWebSocket';
import styles from './Grid.style';

interface Props {
  rows: number;
  cols: number;
}

const Grid: React.FC<Props> = ({ rows, cols }) => {
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const { gridContainer, rowContainer, colContainer } = styles;

  useEffect(() => (setGrid(initialGrid)), [rows, cols]);
  const findValidRow = (col: number): number => {
    for (let row = rows - 1; row >= 0; row--) {
      if (!grid[row][col]) {
        return row;
      }
    }
    return -1; // Column is full
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

  const handleClick = (col: number): void => {
    const row = findValidRow(col);

    if (row !== -1) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);

      // Add logic to check for a winner

      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const Square: React.FC<{ value: string | null; row: number; col: number }> = ({ value, row, col }) => (
    <Box sx={colContainer} onClick={() => handleClick(col)}>
      {value && <img src={`../src/assets/${value}.svg`} alt={value} />}
    </Box>
  );

  return (
    <Box sx={gridContainer}>
      {grid.map((row: string[], rowIndex: number) => (
        <Stack key={rowIndex} sx={rowContainer} direction="row">
          {row.map((col: string, colIndex: number) => (
            <Square key={colIndex} value={col} row={rowIndex} col={colIndex} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default Grid;
