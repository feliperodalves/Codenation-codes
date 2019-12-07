function checkPalindrome(word) {
  const clean = word.replace(/[^A-Z0-9]+/gi, '');
  const reverse = clean
    .split('')
    .reverse()
    .join('');

  return clean === reverse;
}

function addToList(field) {
  const row = document.createElement('tr');
  const wordTD = document.createElement('td');
  const palindromeTD = document.createElement('td');
  const palindromeResult = document.createAttribute('data-verificado');
  const table = document.querySelector('#results');

  wordTD.innerText = field;
  if (checkPalindrome(field)) {
    palindromeTD.innerHTML = 'sim';
    palindromeResult.value = 'positivo';
  } else {
    palindromeTD.innerHTML = 'não';
    palindromeResult.value = 'negativo';
  }

  row.appendChild(wordTD);
  row.attributes.setNamedItem(palindromeResult);
  row.appendChild(palindromeTD);

  table.appendChild(row);
}

function handleSubmit(e) {
  e.preventDefault();
  const word = document.querySelector('#palindrome-input').value;
  if (word.trim() !== '') {
    addToList(word);
  }
  e.target.reset();
}

function limpaHistorico() {
  document.querySelector('#results').innerHTML = '';
}

document
  .querySelector('#palindrome-form')
  .addEventListener('submit', handleSubmit);
document
  .querySelector('[data-test="limpar-dados"]')
  .addEventListener('click', limpaHistorico);
