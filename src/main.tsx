import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App.tsx'
import '../src/styles/index.css'
import ProminentAppBar from "./components/AppBar.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ProminentAppBar/>
    <App />
  </React.StrictMode>,
)
