import {
  Box, Stack, Modal, Typography, Button, Slide,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai/index';
import useWebSocket from '../useWebSocket';
import styles from './Grid.style';
import { colsAtom, rowAtom } from '../AppBar/AppBar.tsx';
import Square from './Square';

const Grid: React.FC = () => {
  const [rows] = useAtom(rowAtom);
  const [cols] = useAtom(colsAtom);
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const [showPopup, setShowPopup] = useState(false);
  const { gridContainer, colContainer } = styles;

  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
      });

      socket.on('message', (message: any) => {
        console.log('Message reçu:', message);
      });
    }
  }, [socket]);

  useEffect(() => (setGrid(initialGrid)), [rows, cols]);
  const findValidRow = (col: number): number => {
    for (let row = rows - 1; row >= 0; row--) {
      if (!grid[row][col]) {
        return row;
      }
    }
    return -1;
  };
  const checkForWinner = (row: number, col: number): boolean => {
    const player = grid[row][col];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let col = 0; col <= cols - 4; col++) {
        if (grid[rowIndex][col] === player
            && grid[rowIndex][col + 1] === player
            && grid[rowIndex][col + 2] === player
            && grid[rowIndex][col + 3] === player) {
          return true;
        }
      }
    }

    for (let colIndex = 0; colIndex < cols; colIndex++) {
      for (let rowIndex = 0; rowIndex <= rows - 4; rowIndex++) {
        if (grid[rowIndex][colIndex] === player
            && grid[rowIndex + 1][colIndex] === player
            && grid[rowIndex + 2][colIndex] === player
            && grid[rowIndex + 3][colIndex] === player) {
          return true;
        }
      }
    }

    for (let rowIndex = 0; rowIndex <= rows - 4; rowIndex++) {
      for (let colIndex = 0; colIndex <= cols - 4; colIndex++) {
        if (grid[rowIndex][colIndex] === player
            && grid[rowIndex + 1][colIndex + 1] === player
            && grid[rowIndex + 2][colIndex + 2] === player
            && grid[rowIndex + 3][colIndex + 3] === player) {
          return true;
        }
      }
    }

    for (let rowIndex = 3; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex <= cols - 4; colIndex++) {
        if (grid[rowIndex][colIndex] === player
            && grid[rowIndex - 1][colIndex + 1] === player
            && grid[rowIndex - 2][colIndex + 2] === player
            && grid[rowIndex - 3][colIndex + 3] === player) {
          return true;
        }
      }
    }

    return false;
  };
  const handleClick = (col: number): void => {
    const row = findValidRow(col);

    if (row !== -1) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);

      if (checkForWinner(row, col)) {
        setShowPopup(true); // Show victory popup
      } else {
        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
      }
    }
  };
  const handleReset = (): void => {
    setShowPopup(false);
    setGrid(initialGrid);
    setCurrentPlayer('red');
  };

  return (
    <Box sx={{ ...gridContainer, background: 'url(\'../src/assets/background.jpg\')' }}>
      {grid.map((row: string[], rowIndex: number) => (
        <Stack key={rowIndex} direction="row">
          {row.map((col: string, colIndex: number) => (
            <Square key={colIndex} value={col} row={rowIndex} col={colIndex} />
          ))}
        </Stack>
      ))}
      <Modal open={showPopup} onClose={() => setShowPopup(false)}>
        <Slide direction="up" in={showPopup} mountOnEnter unmountOnExit>
          <Box sx={{
            position: 'absolute', top: '29%', left: '42%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 8, textAlign: 'center',
          }}
          >
            <img src={`../src/assets/${currentPlayer}.svg`} alt={currentPlayer} style={{ width: 100, marginBottom: 20 }} />
            <Typography variant="h5" gutterBottom>
              {`${currentPlayer.toUpperCase()} WIN!`}
            </Typography>
            <Button variant="contained" onClick={handleReset}>Close</Button>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

export default Grid;
