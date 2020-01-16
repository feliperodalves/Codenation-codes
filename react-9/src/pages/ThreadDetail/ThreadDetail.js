import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Thread from '../../components/Thread';
import api from '../../services/api';

export default function ThreadDetail({ match }) {
  const [thread, setThread] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function loadThread() {
      try {
        const response = await api.get(`/threads/${match.params.thread_slug}`);
        setThread(response.data.data);
        setLoading(false);
      } catch (error) {
        setRedirect(true);
      }
    }
    loadThread();
  }, [match.params.thread_slug]);
  return redirect ? (
    <Redirect to="/404" />
  ) : (
    <>{loading ? <div>Carregando</div> : <Thread thread={thread} />}</>
  );
}
