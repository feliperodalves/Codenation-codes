import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Form } from 'react-bulma-components';

import Navbar from '../../components/Navbar';

import { Creators as ContactActions } from '../../store/ducks/contacts';

export default function EditContact({ match, history }) {
  const { contact_id } = match.params;
  const contacts = useSelector(state => state.contacts);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (contact_id) {
      if (contacts.find(contact => contact.id === contact_id)) {
        setData(contacts.find(contact => contact.id === contact_id));
      } else {
        history.push('/404');
      }
    }
  }, [contact_id, contacts, history]);

  const handleSubmit = e => {
    e.preventDefault();

    if (contact_id) {
      dispatch(ContactActions.editContact({ id: contact_id, ...data }));
    } else {
      dispatch(ContactActions.createContact(data));
    }
    history.push('/');
  };

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Navbar
        title={contact_id ? data.name : 'Novo Contato'}
        newContact={contact_id}
        onSubmit={handleSubmit}
      />
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label htmlFor="name">Nome</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              data-test="nome"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              data-test="email"
            />
          </Form.Control>
        </Form.Field>
      </form>
    </Box>
  );
}
