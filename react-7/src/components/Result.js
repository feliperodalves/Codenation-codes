import React from 'react';

export default function Result({ corrects, totalQuestions, handleReset }) {
  return (
    <div data-resultado={corrects}>
      {`Você acertou ${
        corrects === -1 ? 0 : corrects
      } de ${totalQuestions} perguntas!`}
      <button type="button" data-test="refazer" onClick={() => handleReset()}>
        Refazer Quiz
      </button>
    </div>
  );
}
