import { Box, Stack } from '@mui/material';
import { styles } from './Grid.style';
import { useState } from 'react';

const Grid = () => {
  const { gridContainer, rowContainer, colContainer } = styles;
  const numRows = 6;
  const numCols = 7;

  const initialGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));
  const [grid, setGrid] = useState(initialGrid);
  const [currentPlayer, setCurrentPlayer] = useState('red');

  const handleClick = (row:number, col:number) => {
    if (!grid[row][col]) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const Square = ({ value, row, col }: any) => {
    return (
      <Box sx={colContainer} onClick={() => handleClick(row, col)}>
        {value && <img src={`../src/assets/${value}.svg`} alt={value} />}
      </Box>
    );
  };

  return (
    <Box sx={gridContainer}>
      {grid.map((row, rowIndex) => (
        <Stack key={rowIndex} sx={rowContainer} direction={'row'}>
          {row.map((col, colIndex) => (
            <Square key={colIndex} value={col} row={rowIndex} col={colIndex} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default Grid;
