import React, { useState, useEffect } from 'react';
import { Box } from 'react-bulma-components';

import Navbar from '../../components/Navbar';

export default function EditContact({ match }) {
  const [contact, setContact] = useState({ name: '', email: '' });

  useEffect(() => {
    const { id } = match.params;

    if (id) {
      setContact({ name: id });
    }
  }, [match.params]);

  return (
    <Box>
      <Navbar title={!contact ? 'Novo Contato' : contact.name} />
      <div>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" />
        <label />
        <input type="text" />
      </div>
    </Box>
  );
}
