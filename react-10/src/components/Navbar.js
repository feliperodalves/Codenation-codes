import React from 'react';
import { Level, Heading, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';

export default function NavbarComponent({
  title,
  newContact,
  home,
  onSubmit,
  ...rest
}) {
  return (
    <Level renderAs="nav" {...rest}>
      <Level.Side align="left">
        <Level.Item>
          <Heading>{title}</Heading>
        </Level.Item>
      </Level.Side>
      <Level.Side align="right">
        {!home ? (
          <Level.Item>
            <Link to="/">
              <Button type="button">
                {newContact ? 'Cancelar' : 'Voltar'}
              </Button>
            </Link>
            <Button
              type="button"
              onClick={onSubmit}
              data-test={newContact ? 'salvar' : 'criar'}
            >
              {newContact ? 'Salvar' : 'Criar Contato'}
            </Button>
          </Level.Item>
        ) : (
          <Level.Item>
            <Link to="create">
              <Button type="button" data-test="novo-contato">
                Adicionar Contato
              </Button>
            </Link>
          </Level.Item>
        )}
      </Level.Side>
    </Level>
  );
}
