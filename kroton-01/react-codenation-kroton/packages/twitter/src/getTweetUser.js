export default function(tweet) {
  const container = document.createElement('div');
  container.classList.add('user');

  const authorName = document.createElement('span');
  authorName.classList.add('mr-1', 'author', 'bold');
  authorName.textContent = tweet.author;

  const authorUsername = document.createElement('span');
  authorUsername.classList.add('username');
  authorUsername.textContent = tweet.username;

  const space = document.createElement('span');
  space.textContent = ' - ';

  const elapsedTime = document.createElement('span');
  elapsedTime.classList.add('time');
  elapsedTime.textContent = tweet.elapsedTime;

  container.appendChild(authorName);
  container.appendChild(authorUsername);
  container.appendChild(space);
  container.appendChild(elapsedTime);

  return container;
}
