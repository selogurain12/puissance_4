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
    return -1;
  };

  const checkForWinner = (row: number, col: number): boolean => {
    const player = grid[row][col];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
          if (grid[row][col] === player &&
              grid[row][col + 1] === player &&
              grid[row][col + 2] === player &&
              grid[row][col + 3] === player) {
              return true;
          }
      }
  }

  for (let col = 0; col < numCols; col++) {
      for (let row = 0; row <= numRows - 4; row++) {
          if (grid[row][col] === player &&
              grid[row + 1][col] === player &&
              grid[row + 2][col] === player &&
              grid[row + 3][col] === player) {
              return true;
          }
      }
  }

  for (let row = 0; row <= numRows - 4; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
          if (grid[row][col] === player &&
              grid[row + 1][col + 1] === player &&
              grid[row + 2][col + 2] === player &&
              grid[row + 3][col + 3] === player) {
              return true;
          }
      }
  }

  for (let row = 3; row < numRows; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
          if (grid[row][col] === player &&
              grid[row - 1][col + 1] === player &&
              grid[row - 2][col + 2] === player &&
              grid[row - 3][col + 3] === player) {
              return true;
          }
      }
  }

  return false;
  }

  const handleClick = (col: number): void => {
    const row = findValidRow(col);

    if (row !== -1) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);

      if (checkForWinner(row, col)) {
        console.log(`${currentPlayer} wins!`);
      } else {
        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
      }

      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const Square: React.FC<SquareProps> = ({ value, col}) => {
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
