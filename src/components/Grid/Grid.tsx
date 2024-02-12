import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Grid.style';
import { io } from 'socket.io-client';

interface Props {
  rows: number;
  cols: number;
}
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"]
});
const Grid: React.FC<Props> = ({ rows, cols }) => {
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const { gridContainer, colContainer } = styles;

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });
    socket.on('move', (move) => {
      applyMove(move);
    });
  }, [socket, grid]);
  
  const applyMove = (move: { row: any; col: any; player: any; }) => {
    const { row, col, player } = move;
    if(grid[row][col] === null) { // Vérifiez si la cellule est vide
      const newGrid = [...grid];
      newGrid[row][col] = player;
      setGrid(newGrid); // Mettez à jour la grille avec le nouveau mouvement
    }
  };

  useEffect(() => (setGrid(initialGrid)), [rows, cols]);
  const findValidRow = (col: number): number => {
    for (let row = rows - 1; row >= 0; row--) {
      if (!grid[row][col]) {
        return row;
      }
    }
    return -1;
  };

  const handleClick = (col: number): void => {
    const row = findValidRow(col);

    if (row !== -1) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      socket.emit("move", { row, col, player: currentPlayer })
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
        <Stack key={rowIndex} direction="row">
          {row.map((col: string, colIndex: number) => (
            <Square key={colIndex} value={col} row={rowIndex} col={colIndex} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default Grid;
