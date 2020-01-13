import React, { useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Heading, Form, Icon, Loader } from 'react-bulma-components';
import { MdPerson } from 'react-icons/md';

import api from './services/api';
import GitCard from './components/GitCard';

import empty from './assets/empty.png';
import notFound from './assets/404.jpg';

function App() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [valid, setValid] = useState(true);
  const [response, setResponse] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    setResponse('');
    setLoading(true);

    if (valid && user !== '') {
      try {
        const res = await api.get(`users/${user}/repos`);
        setRepositories(res.data);
        if (res.data.length === 0) {
          setResponse('empty');
        } else {
          setResponse('');
        }
      } catch (error) {
        setResponse('404');
      }
    }
    setLoading(false);
  };

  const handleChange = e => {
    const { value } = e.target;
    setUser(value);
    const r = new RegExp('^[A-z0-9](?:[A-z0-9]|[-](?=[A-z0-9]))*$');
    if ((value.match(r) || value === '') && value.length <= 39) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <Container>
      <Heading size={1}>GitHub</Heading>
      <p>Veja os repositórios do seu usuário favorito</p>
      <form onSubmit={handleSubmit}>
        <Form.Control iconLeft>
          <Form.Input
            type="text"
            value={user}
            onChange={e => handleChange(e)}
            data-test="entrada"
            color={valid ? null : 'danger'}
          />

          <Icon align="left">{loading ? <Loader /> : <MdPerson />}</Icon>
        </Form.Control>
      </form>
      {response === '404' && (
        <Container data-test="nao-encontrado">
          <img
            src={notFound}
            style={{ height: '300px' }}
            alt="User not Found"
          />
          <p>404 - Usuário não encontrado</p>
        </Container>
      )}
      {response === 'empty' && (
        <Container data-test="sem-repositorios">
          <img src={empty} style={{ height: '300px' }} alt="Empty Repository" />
          <p>Nenhum repositório</p>
        </Container>
      )}
      {response === '' &&
        repositories.map(repo => (
          <Container key={repo.name} data-test="repositorio">
            <GitCard repo={repo} />
          </Container>
        ))}
    </Container>
  );
}

export default App;
