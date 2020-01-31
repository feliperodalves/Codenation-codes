import React from 'react';
import { Container, Heading } from 'react-bulma-components';

export default function EmptyList({ ...rest }) {
  return (
    <Container {...rest}>
      <Heading size={5}>Você não tem contatos cadastrados</Heading>
    </Container>
  );
}
