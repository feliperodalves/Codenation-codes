import React, { useState, useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Question from './components/Question';
import Result from './components/Result';

import baseQuestions from './questions.json';

function App() {
  const [resultados, setResultados] = useState(-1);
  const [respondidas, setRespondidas] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(baseQuestions);
  }, []);

  const handleAnswer = (questionId, answerId) => {
    const temp = questions.map(q =>
      q.id === questionId
        ? {
            ...q,
            answers: q.answers.map(a => {
              if (a.id === answerId) {
                const res = { ...a, selected: true };
                if (a.correct === true) {
                  setResultados(resultados >= 0 ? resultados + 1 : 1);
                }
                return res;
              }
              return a;
            }),
            answered: true,
          }
        : q
    );
    setQuestions(temp);
    setRespondidas(respondidas + 1);
  };

  const handleReset = () => {
    setResultados(-1);
    setRespondidas(0);
    setQuestions(baseQuestions);
  };

  return (
    <>
      {questions.map(question => (
        <Question
          key={question.id}
          question={question}
          handleAnswer={handleAnswer}
        />
      ))}
      {respondidas === questions.length && (
        <Result
          handleReset={handleReset}
          corrects={resultados}
          totalQuestions={questions.length}
        />
      )}
    </>
  );
}

export default App;
