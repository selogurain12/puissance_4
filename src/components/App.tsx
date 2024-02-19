import React from 'react';
import { Grid, Box } from '@mui/material';
import AppBarComponent from './AppBar/AppBar.tsx';
import GridComponent from './Grid/Grid.tsx';
import Chat from './Chat/chat.tsx';

const App: React.FC = () => (
  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <AppBarComponent />
    <Box sx={{ width: '100%', marginTop: 15 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={9}>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <GridComponent />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Chat />
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default App;
