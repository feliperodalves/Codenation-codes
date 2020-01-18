import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bulma-components';
import moment from 'moment';

export default function Reply({ reply }) {
  return (
    <Media data-test="resposta">
      <p>
        <strong>{reply.user.name}</strong>
        <br />
        {reply.body}
        <br />
        <small>
          <i>
            {`Comentado em ${moment(reply.created_at)
              .locale('pt-br')
              .format('DD/MM/YYYY [as] hh:mm:ss')}`}
          </i>
        </small>
      </p>
    </Media>
  );
}

Reply.propTypes = {
  reply: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
};
