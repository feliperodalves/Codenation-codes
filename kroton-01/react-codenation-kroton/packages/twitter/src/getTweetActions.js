import conversation from '../imgs/conversation.png';
import retweet from '../imgs/retweet.png';
import heart from '../imgs/heart.png';
import upload from '../imgs/upload.png';

const actions = [conversation, retweet, heart, upload];

export default function(tweet) {
  const actionsUL = document.createElement('ul');
  actionsUL.classList.add('d-flex', 'justify-content-between');
  for (const action of actions) {
    const actionLI = document.createElement('li');
    const actionIMG = document.createElement('img');
    const actionSPAN = document.createElement('span');

    if (action.includes('conversation')) {
      actionIMG.src = conversation;
      actionSPAN.innerHTML = tweet.replies || 0;
    }
    if (action.includes('retweet')) {
      actionIMG.src = retweet;
      actionSPAN.innerHTML = tweet.retweets || 0;
    }
    if (action.includes('heart')) {
      actionIMG.src = heart;
      actionSPAN.innerHTML = tweet.likes || 0;
    }
    if (action.includes('upload')) {
      actionIMG.src = upload;
      actionSPAN.innerHTML = 0;
    }
    actionIMG.classList.add('mr-1');
    actionLI.appendChild(actionIMG);
    if (actionSPAN.innerHTML > 0) {
      actionLI.appendChild(actionSPAN);
    }

    actionsUL.appendChild(actionLI);
  }

  return actionsUL;
}
