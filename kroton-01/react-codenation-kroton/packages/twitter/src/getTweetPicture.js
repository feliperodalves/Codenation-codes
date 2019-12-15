export default function getTweetPicture(tweet) {
  const div = document.createElement('div');
  div.classList.add('mr-2');

  const img = document.createElement('img');
  img.src = tweet.authorSrc;

  div.appendChild(img);

  return div;
}
