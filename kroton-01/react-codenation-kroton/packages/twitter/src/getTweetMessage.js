export default function(tweet) {
  const p = document.createElement('p');
  p.classList.add('message');

  const pieces = tweet.message.split(' ');
  const piecesOfTweet = [];

  for (const piece of pieces) {
    piecesOfTweet.push(piece.startsWith('#') ? `<i>${piece}</i>` : `${piece}`);
  }

  p.innerHTML = piecesOfTweet.join(' ');

  return p;
}
