import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Link to="/" data-test="voltar">
      Voltar para o início
    </Link>
  );
}
