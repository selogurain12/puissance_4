import { Box, Stack } from '@mui/material';
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
          ))}
        </Stack>
      ))}
    </Box>
  );
}
