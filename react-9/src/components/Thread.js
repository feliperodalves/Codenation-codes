import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Media, Content } from 'react-bulma-components';
import { MdMessage } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function Thread({ thread }) {
  return (
    <Box>
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
              <Link to={`/thread/${thread.slug}`}>
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
            </p>
          </Content>
        </Media.Item>
        {thread.replies && (
          <Content>
            {thread.replies.map(r => (
              <div>{r.body}</div>
            ))}
          </Content>
        )}
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
