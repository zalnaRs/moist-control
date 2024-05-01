import { Route, Router } from '@solidjs/router';
import { createTheme, ThemeProvider } from '@suid/material';
import CssBaseline from '@suid/material/CssBaseline';
import { Component, onMount } from 'solid-js';
import MainAppBar from './components/MainAppBar';
import DeviceProvider from './contexts/DeviceProvider';
import Connect from './pages/Connect';
import Home from './pages/Home';

export const theme = createTheme();

const App: Component = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainAppBar />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/connect" component={Connect} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
