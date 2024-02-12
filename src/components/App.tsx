import React from 'react';
import { useAtom } from 'jotai';
import AppBarComponent, { rowAtom, colsAtom } from './AppBar/AppBar.tsx';
import GridComponent from './Grid/Grid.tsx';
import Chat from './Chat/chat.tsx';
import { Grid, Box } from '@mui/material';
import '../styles/App.css';

const App: React.FC = () => {
  const [row] = useAtom(rowAtom);
  const [cols] = useAtom(colsAtom);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarComponent />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <GridComponent rows={row} cols={cols} />
        </Grid>
        <Grid item xs={4}>
          <Chat />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
