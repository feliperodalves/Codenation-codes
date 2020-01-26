import React, { useState } from 'react';
import { Box } from 'react-bulma-components';
import Navbar from '../../components/Navbar';
import EmptyList from '../../components/EmptyList';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  return (
    <Box>
      <Navbar title="Contatos" home />
      {contacts.length > 0 ? <div>listagem</div> : <EmptyList />}
    </Box>
  );
}
