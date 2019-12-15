import getTweet from './getTweet';
import tweets from './tweets';
import { addListener, handleSubmit, handleChange } from './search';

function addTweetsTo(selector) {
  for (const tweet of tweets) {
    document.querySelector(selector).appendChild(getTweet(tweet));
  }
}

function filterTweets(selector, search) {
  document.querySelectorAll(selector).forEach(tweet => {
    if (tweet.textContent.toLowerCase().includes(search.toLowerCase())) {
      tweet.classList.remove('d-none');
    } else {
      tweet.classList.add('d-none');
    }
  });
}

function colorTweet(selector, search) {
  document.querySelectorAll(selector).forEach(tweet => {
    tweet.innerHTML = tweet.innerHTML.replace('<b>', '').replace('</b>', '');
    if (search !== '') {
      tweet.innerHTML = tweet.innerHTML
        .toLowerCase()
        .split(search.toLowerCase())
        .join(`<b>${search.toLowerCase()}</b>`);
    }
  });
}

addTweetsTo('#tweets');

document.querySelector('#search-form').addEventListener('submit', handleSubmit);
document.querySelector('#search-input').addEventListener('keyup', handleChange);

addListener('onsubmit', function(search) {
  filterTweets('li.tweet', search);
});

addListener('onchange', function(search) {
  colorTweet('.message', search);
});
