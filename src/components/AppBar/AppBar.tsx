import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { atom, useAtom } from 'jotai';
import useWebSocket from '../useWebSocket';

export const rowAtom = atom(6);
export const colsAtom = atom(7);
const AppBarConnectFour: React.FC = () => {
  const socket = useWebSocket();
  const [row, setRow] = useAtom(rowAtom);
  const [cols, setCols] = useAtom(colsAtom);

  useEffect(() => {
    if(socket){
    const handleChangeGrid = (gridSize: { rows: number; cols: number; }) => {
      setRow(gridSize.rows);
      setCols(gridSize.cols);
    }

    socket.on('gridSizeUpdated', handleChangeGrid);
  
    return () => {
      socket.off('gridSizeUpdated', handleChangeGrid);
    };
  }
  }, [socket, setRow, setCols]);
  

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value) {
      setRow(value);
      socket.emit('updateGridSize', { rows: value, cols });
    }
    else setRow(0);
  };
  
  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value) {
      setCols(value);
      socket.emit('updateGridSize', { row, cols: value });
    }
    else setCols(0);
  };
  

  return (
    <Box sx={{flexGrow: 1}}>
      <Box>
        <AppBar position="fixed">
        <Toolbar sx={{ alignItems: 'center', padding: 2, minHeight: '80px' }}>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
              Connect 4
            </Typography>
            <TextField
              label="Row"
              value={row}
              onChange={handleRowChange}
              variant="outlined"
            />
            <TextField
              label="Cols"
              value={cols}
              onChange={handleColsChange}
              variant="outlined"
            />
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default AppBarConnectFour;
