import { Box, Stack } from '@mui/material';
<<<<<<< HEAD
import React from 'react';
import styles from './Grid.style.ts';

interface Props {
  rows: number;
  cols: number;
}
const Grid:React.FC<Props> = ({ rows, cols }) => {
  const { gridContainer, rowContainer, colContainer } = styles;
  const arrRows = Array.from({ length: rows }, (_, index) => index + 1);
  const arrCols = Array.from({ length: cols }, (_, index) => index + 1);
  return (
    <Box sx={gridContainer}>
      {arrRows.map((row) => (
        <Stack key={row} sx={rowContainer} direction="row">
          {arrCols.map((col) => (
            <Box key={col} sx={colContainer}>
              X
            </Box>
=======
import { styles } from './Grid.style';
import { useState } from 'react';

export default function Grid() {
  const { gridContainer, rowContainer, colContainer } = styles;
  const rows = [1, 2, 3, 4, 5, 6];
  const cols = [1, 2, 3, 4, 5, 6, 7];

  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [currentCase, setCurrentCase] = useState('');

  const handleClick = () => {
    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red')
  };

  const Square = () => {
    return (
      <Box sx={colContainer} onClick={() => handleClick()}>
        {currentCase === '' && currentPlayer && <img src={`../src/assets/${currentPlayer}.svg`} alt={currentPlayer} />}
      </Box>
    );
  };

  return (
    <Box sx={gridContainer}>
      {rows.map((row) => (
        <Stack key={row} sx={rowContainer} direction={'row'}>
          {cols.map((col) => (
            <Square key={col}/>
>>>>>>> feature/grid
          ))}
        </Stack>
      ))}
    </Box>
  );
<<<<<<< HEAD
};

export default Grid;
=======
}
>>>>>>> feature/grid
