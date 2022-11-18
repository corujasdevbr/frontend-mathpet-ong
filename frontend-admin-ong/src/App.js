import React from 'react';
import { AuthProvider } from './hooks/useAuth';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import AppRoutes from './routes/routes';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            { <AppRoutes /> }
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
