import React, { useState, useEffect } from 'react';
import { Container } from 'react-bulma-components';
import api from '../../services/api';

import Thread from '../../components/Thread';

export default function ThreadList() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadThreads() {
      const response = await api.get('/threads');

      if (response.data.data) {
        setThreads(response.data.data);
        setLoading(false);
      } else {
        // TODO: RETURN ERROR
      }
    }
    loadThreads();
  }, []);

  return (
    <>
      {loading ? (
        <div>Carregando</div>
      ) : (
        <Container>
          {threads.map(t => (
            <Thread key={t.id} thread={t}>
              {t.id}
            </Thread>
          ))}
        </Container>
      )}
    </>
  );
}
