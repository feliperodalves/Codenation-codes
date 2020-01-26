import React from 'react';
import { Level, Heading, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';

export default function NavbarComponent({ title, newContact, home }) {
  return (
    <Level renderAs="nav">
      <Level.Side align="left">
        <Level.Item>
          <Heading>{title}</Heading>
        </Level.Item>
      </Level.Side>
      <Level.Side align="right">
        {!home ? (
          <Level.Item>
            <Button type="button">Cancelar|Voltar</Button>
          </Level.Item>
        ) : (
          <Level.Item>
            <Link to="edit">
              <Button type="button">Adicionar Contato</Button>
            </Link>
          </Level.Item>
        )}
      </Level.Side>
    </Level>
  );
}
