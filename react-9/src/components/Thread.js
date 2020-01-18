import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Media, Content } from 'react-bulma-components';
import { MdMessage } from 'react-icons/md';
import PropTypes from 'prop-types';
import moment from 'moment';
import Reply from './Reply';

export default function Thread({ thread }) {
  return (
    <Box data-test="thread">
      <Media>
        <Media.Item>
          <Content>
            <p>
              <strong>{thread.title}</strong>
              {' - '}
              <small>{thread.user.name}</small>
              {' - '}
              <small>{thread.user.email}</small>
              <br />
              {thread.body}
              <br />
              <Link to={`/thread/${thread.slug}`} data-test="link">
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#999',
                  }}
                >
                  <MdMessage />
                  <small>{thread.total_replies}</small>
                </span>
              </Link>
              <small>
                <i>
                  {`Postado em ${moment(thread.created_at)
                    .locale('pt-br')
                    .format('DD/MM/YYYY [as] hh:mm:ss')}`}
                </i>
              </small>
            </p>
          </Content>
          {thread.replies && (
            <Media.Item position="right">
              <Content>
                {thread.replies.map(r => (
                  <Reply reply={r} />
                ))}
              </Content>
            </Media.Item>
          )}
        </Media.Item>
      </Media>
    </Box>
  );
}

Thread.propTypes = {
  thread: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    total_replies: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
