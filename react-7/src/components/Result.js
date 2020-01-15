import React from 'react';
import { Container, Button, Heading } from 'react-bulma-components';
import PropTypes from 'prop-types';

export default function Result({ corrects, totalQuestions, handleReset }) {
  return (
    <Container
      data-resultado={corrects === -1 ? 0 : corrects}
      style={{ marginTop: '50px' }}
    >
      <Heading size={3}>{`Você acertou ${
        corrects === -1 ? 0 : corrects
      } de ${totalQuestions} perguntas!`}</Heading>
      <Button type="button" data-test="refazer" onClick={() => handleReset()}>
        Refazer Quiz
      </Button>
    </Container>
  );
}

Result.propTypes = {
  corrects: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  handleReset: PropTypes.func.isRequired,
};
