const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const FormData = require('form-data');

const CrpCsar = require('./cifra');
const api = require('./api');

const app = express();

const token = 'e84d4a27afbe408fb05add4fb599de58162a8eab';

app.get('/', async function getData(req, res) {
  const response = await api.get('generate-data', {
    params: {
      token,
    },
  });

  const teste = new CrpCsar();

  const { numero_casas, cifrado } = response.data;

  const decifrado = teste.cript(cifrado, -numero_casas);

  const data = {
    ...response.data,
    decifrado,
    resumo_criptografico: crypto
      .createHash('sha1')
      .update(decifrado)
      .digest('hex'),
  };

  const processData = JSON.stringify(data);

  await fs.writeFile('./answer.json', processData, () => {});

  const form = new FormData();

  form.append('answer', fs.createReadStream('./answer.json'));

  const finalResponse = await api.post('submit-solution', form, {
    params: {
      token,
    },
  });

  res.send(finalResponse.data);
});

app.listen(3000);
