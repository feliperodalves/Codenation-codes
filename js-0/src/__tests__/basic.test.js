const assert = require('assert');

/**
 * Main input selector.
 */
const selector = '[data-test="entrada"]';

/**
 * Type into certain input ($eval hack).
 * This is needed cause for whatever reason 'input.type' requires it to be blurred after press.
 */
const typeInput = async (input, string) => {
  await page.$eval(selector, (input, string) => (input.value = string), string);
  await input.press(String.fromCharCode(13));
};

/**
 * Retrieve main page input.
 */
const getInput = async () => {
  await page.waitForSelector(selector);

  const input = await page.$(selector);

  assert(input !== null, 'Could not find the input');

  return input;
};

/**
 * Type the string to input and make asserts with the API.
 */
const assertString = async (selector, input, string, flag) => {
  await typeInput(input, string);

  assert(
    await page.evaluate((string) => window.find(string), string),
    'Could not find the checked string in page',
  );
  assert(
    (await page.$(`[data-verificado="${flag ? 'positivo' : 'negativo'}"]`))
      !== null,
    'Could not find the correct data-verificado of this the checked string',
  );
  assert(
    await page.$eval(selector, (input) => input.value == ''),
    'Input should be reseted after submission',
  );
};

/**
 * Load page recursive.
 */
const load = async () => {
  try {
    await page.goto('http://localhost:1337');
  } catch (e) {
    await load();
  }
};

describe('Palindrome', () => {
  beforeEach(load);

  it('should be able to add a new record if it is not empty', async () => {
    const input = await getInput();

    await typeInput(input, '   ');

    assert(
      (await page.$$('[data-verificado="negativo"]')).length === 0,
      'Empty string or composed only of spaces should not be validated',
    );
    assert(
      (await page.$$('[data-verificado="positivo"]')).length === 0,
      'Empty string or composed only of spaces should not be validated',
    );

    await assertString(selector, input, 'not a palindrome', false);
    await assertString(selector, input, 'testset', true);
  });

  it('should be able to clear history data', async () => {
    const input = await getInput();

    await typeInput(input, 'teste');
    await typeInput(input, 'teste');
    await typeInput(input, 'teste');
    await typeInput(input, 'teste');
    await typeInput(input, 'teste');

    assert(
      (await page.$$('[data-verificado="negativo"]')).length === 5,
      'Palindrome verification do not work',
    );

    const button = await page.$('[data-test="limpar-dados"]');

    assert(button !== null, 'Could not find clear data button');

    await button.click();

    assert(
      (await page.$$('[data-verificado="negativo"]')).length === 0,
      'Palindrome clear data button do not work',
    );
  });
});
