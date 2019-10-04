function CrpCsar() {}

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

let lengthReplace = 0;

CrpCsar.prototype.cript = function(msg, length) {
  if (msg === undefined || length === undefined) {
    return null;
  }
  lengthReplace = length;

  const array = msg.split('');
  let response = '';
  for (const index in array) {
    response += helper.convertLetter(array[index]);
  }
  return response;
};

const helper = {
  convertLetter(letter) {
    if (letter === ' ') {
      return ' ';
    }
    const letterPosition = alphabet.indexOf(letter);
    if (letterPosition === -1) {
      return letter;
    }
    return alphabet[helper.changeLetterPosition(letterPosition)];
  },

  changeLetterPosition(position) {
    let response = position + lengthReplace;

    if (response < 0) {
      response += alphabet.length;
    }

    if (response > alphabet.length) {
      response -= alphabet.length;
    }
    return response;
  },
};

module.exports = CrpCsar;
