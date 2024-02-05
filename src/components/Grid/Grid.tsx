import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { styles } from './Grid.style';

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
