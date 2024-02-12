import '../styles/App.css';
import React from 'react';
import { useAtom } from 'jotai';
import AppBar, { rowAtom, colsAtom } from './AppBar/AppBar.tsx';
import Grid from './Grid/Grid.tsx';

const App:React.FC = () => {
  const [row] = useAtom(rowAtom);
  const [cols] = useAtom(colsAtom);
  return (
    <>
      <AppBar />
      <Grid rows={row} cols={cols} />
    </>
  );
};
export default App;
