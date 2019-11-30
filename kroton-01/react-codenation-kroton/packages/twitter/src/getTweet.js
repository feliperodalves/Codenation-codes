import getTweetPicture from './getTweetPicture';
import getTweetUser from './getTweetUser';
import getTweetMessage from './getTweetMessage';
import getTweetActions from './getTweetActions';

export default function getTweet(tweet) {
  const tweetElem = document.createElement('li');
  tweetElem.classList.add('tweet');

  const tweetPicture = getTweetPicture(tweet);
  const tweetUser = getTweetUser(tweet);
  const tweetMessage = getTweetMessage(tweet);
  const tweetActions = getTweetActions(tweet);

  const div = document.createElement('div');
  div.classList.add('d-flex', 'flex-column', 'flex-fill');
  div.appendChild(tweetUser);
  div.appendChild(tweetMessage);
  div.appendChild(tweetActions);

  tweetElem.appendChild(tweetPicture);
  tweetElem.appendChild(div);

  return tweetElem;
}
