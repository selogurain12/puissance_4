import React, { useState } from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { atom, useAtom } from 'jotai';
import appBarStyles from './AppBar.style.ts';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  padding: theme.spacing(2),
  minHeight: '80px',
}));
export const rowAtom = atom(6);
export const colsAtom = atom(7);
const AppBarConnectFour: React.FC = () => {
  const [row, setRow] = useAtom(rowAtom);
  const [cols, setCols] = useAtom(colsAtom);

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value) setRow(value);
    else setRow(0);
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value) setCols(value);
    else setCols(0);
  };

  return (
    <>
      <Box sx={appBarStyles.appBarContainer}>
        <AppBar position="static">
          <StyledToolbar>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
              Connect 4
            </Typography>
            <TextField
              label="Row"
              value={row}
              onChange={handleRowChange}
              variant="outlined"
              margin="dense"
            />
            <TextField
              label="Cols"
              value={cols}
              onChange={handleColsChange}
              variant="outlined"
              margin="dense"
            />
          </StyledToolbar>
        </AppBar>
      </Box>
      <Box sx={appBarStyles.appBarContainer} />
    </>
  );
};

export default AppBarConnectFour;
