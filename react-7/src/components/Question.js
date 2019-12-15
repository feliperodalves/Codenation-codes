import React, { useState, useEffect } from 'react';
import { Button } from 'react-bulma-components';

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
    <div data-test="pergunta" data-resposta={status}>
      <h2>{question.question}</h2>

      {question.answers.map(answer => {
        const color = '';

        return (
          <Button
            // fullwidth
            color={color}
            disabled={!!question.answered}
            type="button"
            key={answer.id}
            data-test="opcao"
            onClick={() => {
              handleAnswer(question.id, answer.id);
            }}
          >
            {answer.answer}
          </Button>
        );
      })}
    </div>
  );
}
