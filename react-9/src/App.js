import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Navbar } from 'react-bulma-components';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Navbar />
        <Routes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
