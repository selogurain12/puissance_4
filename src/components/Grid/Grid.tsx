import { Box, Stack } from '@mui/material';
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
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default Grid;
