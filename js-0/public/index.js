const input = {
  value: '',
  listeners: { onsubmit: [], onchange: [] },
  addListener(key, fn) {
    this.listeners[key].push(fn);
  },
  invoke(key) {
    for (const listener of this.listeners[key]) {
      listener(this.value);
    }
  },
};

function handleSubmit(e) {
  e.preventDefault();
  input.invoke('onsubmit');
  e.target.reset();
}

function handleChange(e) {
  input.value = e.target.value;
  input.invoke('onchange');
}

function addListener(key, fn) {
  input.addListener(key, fn);
}

function checkPalindrome(word) {
  if (
    word
      .split('')
      .reverse()
      .join('') === word
  ) {
    return true;
  }
  return false;
}

function limpaHistorico() {
  const table = document.querySelectorAll('#results>tr');
  for (const row of table) {
    row.innerHTML = '';
  }
}

function addToList(field) {
  const row = document.createElement('tr');
  const wordTD = document.createElement('td');
  const palindromeTD = document.createElement('td');
  const palindromeResult = document.createAttribute('data-verificado');
  const table = document.querySelector('#results');

  wordTD.innerText = field;
  if (checkPalindrome(field)) {
    palindromeTD.innerHTML = 'Sim';
    palindromeResult.value = 'positivo';
  } else {
    palindromeTD.innerHTML = 'Não';
    palindromeResult.value = 'negativo';
  }

  row.appendChild(wordTD);
  palindromeTD.attributes.setNamedItem(palindromeResult);
  row.appendChild(palindromeTD);

  table.appendChild(row);
}

document
  .querySelector('#palindrome-form')
  .addEventListener('submit', handleSubmit);

document
  .querySelector('#palindrome-input')
  .addEventListener('keyup', handleChange);

addListener('onsubmit', (field) => {
  if (field.trim().length > 0) {
    addToList(field);
  }
});
