import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Navbar, Heading } from 'react-bulma-components';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Navbar>
          <Heading size={2}>Forum</Heading>
        </Navbar>
        <Routes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
