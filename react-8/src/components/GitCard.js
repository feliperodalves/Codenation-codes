import React from 'react';
import PropTypes from 'prop-types';
import { Card, Media, Image, Heading, Content } from 'react-bulma-components';
import { MdStar, MdLink } from 'react-icons/md';
import moment from 'moment';

export default function GitCard({ repo }) {
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>{repo.name}</Card.Header.Title>
        <Card.Header.Icon>
          <a href={repo.html_url}>
            <MdLink />
          </a>
        </Card.Header.Icon>
      </Card.Header>
      <Card.Content>
        <Media>
          <Media.Item renderAs="figure" position="left">
            <Image size={64} alt="profile" src={repo.owner.avatar_url} />
          </Media.Item>
          <Media.Item>
            <Heading size={4}>{repo.name}</Heading>
            <Heading subtitle size={6}>
              <MdStar size={24} color="#ff0" />
              {repo.stargazers_count}
            </Heading>
          </Media.Item>
        </Media>
        <Content>
          <p>{repo.description}</p>
          <mark>{repo.language}</mark>
          <p style={{ fontSize: '12px' }}>
            {`Criado em ${moment(repo.created_at)
              .locale('pt-br')
              .format('DD/MM/YYYY')}`}
          </p>
        </Content>
      </Card.Content>
    </Card>
  );
}

GitCard.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
    }),
    stargazers_count: PropTypes.number.isRequired,
    description: PropTypes.string,
    language: PropTypes.string,
    created_at: PropTypes.string.isRequired,
  }),
};

GitCard.defaultProps = {
  repo: PropTypes.shape({
    name: '',
    html_url: '',
    owner: PropTypes.shape({
      avatar_url: '',
    }),
    stargazers_count: 0,
    description: null,
    language: null,
    created_at: '',
  }),
};
