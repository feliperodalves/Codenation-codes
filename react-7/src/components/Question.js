import React, { useState, useEffect } from 'react';
import { Container, Heading, Button } from 'react-bulma-components';
import PropTypes, { arrayOf } from 'prop-types';
import { MdCheck, MdClose } from 'react-icons/md';

export default function Question({ question, handleAnswer }) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const temp =
      question.answered === true &&
      question.answers.filter(a => a.correct === true && a.selected === true);

    if (temp !== false) {
      if (temp.length > 0) {
        setStatus('correta');
      } else {
        setStatus('errada');
      }
    } else {
      setStatus('');
    }
  }, [question]);

  return (
    <Container
      data-test="pergunta"
      data-resposta={status}
      style={{ marginTop: '20px' }}
    >
      <Heading size={2}>{question.question}</Heading>

      {question.answers.map(answer => {
        let color = '';
        if (question.answered && answer.correct) {
          color = 'success';
        } else if (question.answered && answer.selected) {
          color = 'danger';
        }

        return (
          <Button
            fullwidth
            color={color}
            disabled={!!question.answered}
            type="button"
            key={answer.id}
            data-test="opcao"
            onClick={() => {
              handleAnswer(question.id, answer.id);
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
            }}
          >
            <span>{answer.answer}</span>
            {color === 'success' && <MdCheck />}

            {color === 'danger' && <MdClose />}
          </Button>
        );
      })}
    </Container>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    answered: PropTypes.bool,
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        answer: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
      }).isRequired
    ),
  }).isRequired,
  handleAnswer: PropTypes.func.isRequired,
};
