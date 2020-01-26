import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';

import Routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Routes />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
