import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { styles } from './Grid.style';

interface Props {
  rows: number;
  cols: number;
}

const Grid: React.FC<Props> = ({ rows, cols }) => {
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const { gridContainer, rowContainer, colContainer } = styles;

  const handleClick = (row: number, col: number) => {
    if (!grid[row][col]) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const Square: React.FC<{ value: string | null; row: number; col: number }> = ({ value, row, col }) => (
    <Box sx={colContainer} onClick={() => handleClick(row, col)}>
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
