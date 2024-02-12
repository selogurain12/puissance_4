import { Box, Stack } from '@mui/material';
import { styles } from './Grid.style';
import { useState } from 'react';

interface SquareProps {
  value: string | null;
  col: number;
  row: number;
}

const Grid: React.FC = () => {
  const { gridContainer, rowContainer, colContainer } = styles;
  const numRows = 6;
  const numCols = 7;

  const initialGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));
  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');

  const findValidRow = (col: number): number => {
    for (let row = numRows - 1; row >= 0; row--) {
      if (!grid[row][col]) {
        return row;
      }
    }
    return -1; // Column is full
  };

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

  const Square: React.FC<SquareProps> = ({ value, col, row }) => {
    return (
      <Box sx={colContainer} onClick={() => handleClick(col)}>
        {value && <img src={`../src/assets/${value}.svg`} alt={value} />}
      </Box>
    );
  };

  return (
    <Box sx={gridContainer}>
      {grid.map((row, rowIndex) => (
        <Stack key={rowIndex} sx={rowContainer} direction={'row'}>
          {row.map((col, colIndex) => (
            <Square key={colIndex} value={col} col={colIndex} row={rowIndex} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default Grid;
