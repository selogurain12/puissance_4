import React from 'react';
import { useAtom } from 'jotai';
import AppBarComponent, { rowAtom, colsAtom } from './AppBar/AppBar.tsx';
import GridComponent from './Grid/Grid.tsx';
import Chat from './Chat/chat.tsx';
import { Grid, Box } from '@mui/material';

const App: React.FC = () => {
  const [row] = useAtom(rowAtom);
  const [cols] = useAtom(colsAtom);

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <AppBarComponent />
      <Box sx={{width: "100%", marginTop: 15}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={9}>
          <Box sx={{justifyContent: "center", display: "flex"}}>
            <GridComponent rows={row} cols={cols} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{justifyContent: "center", display: "flex"}}>
            <Chat />
          </Box>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default App;
