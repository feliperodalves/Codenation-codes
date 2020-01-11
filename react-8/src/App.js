import React, { useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Form } from 'react-bulma-components';
import api from './services/api';

function App() {
  const [user, setUser] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [valid, setValid] = useState(true);
  const [response, setResponse] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    setResponse('');

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
  };

  const handleChange = e => {
    const { value } = e.target;
    setUser(value);
    const r = new RegExp('^[A-z](?:[A-z]|[-](?=[A-z]))*$');
    if ((value.match(r) || value === '') && value.length <= 39) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <div>
      <h1>GitHub</h1>
      <p>Veja os repositórios do seu usuário favorito</p>
      <form onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          value={user}
          onChange={e => handleChange(e)}
          data-test="entrada"
          color={valid ? null : 'danger'}
        />
      </form>
      {response === '404' && (
        <div data-test="nao-encontrado">404 - Usuário não encontrado</div>
      )}
      {response === 'empty' ? (
        <div data-test="sem-repositorios">Nenhum repositório</div>
      ) : (
        repositories.map(repo => (
          <div key={repo.name} data-test="repositorio">
            {repo.name} - {repo.stargazers_count}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
