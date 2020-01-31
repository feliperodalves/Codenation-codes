import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from 'react-bulma-components';
import Navbar from '../../components/Navbar';
import EmptyList from '../../components/EmptyList';

import { Creators as ContactActions } from '../../store/ducks/contacts';

export default function ContactList({ history }) {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const deleteContact = id => {
    dispatch(ContactActions.deleteContact(id));
  };

  const editContact = id => {
    history.push(`${id}/edit`);
  };

  return (
    <Box>
      <Navbar
        title={`Contatos (${contacts.length})`}
        home
        data-test={`total-${contacts.length}`}
      />
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <div key={contact.id}>
            <p>{contact.name}</p>
            <span>{contact.email}</span>

            <button
              type="button"
              onClick={() => editContact(contact.id)}
              data-test="editar"
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => deleteContact(contact.id)}
              data-test="apagar"
            >
              Excluir
            </button>
          </div>
        ))
      ) : (
        <EmptyList data-test="sem-contatos" />
      )}
    </Box>
  );
}
