const assert = require('assert');

// set to 20 seconds...
jest.setTimeout(20000);

/**
 * Assert page contains string.
 */
const assertString = async (string, message, falsy = false) => {
  assert(
    (await page.evaluate(
      string => document.body.innerText.includes(string),
      string
    )) ^ falsy,
    message
  );
};

/**
 * Wait a X amount of time.
 */
const delay = miliseconds =>
  new Promise(resolve => setTimeout(resolve, miliseconds));

/**
 * Load page recursive.
 */
const load = async (path = '/') => {
  try {
    await page.goto(`http://localhost:3000${path}`);
    await page.evaluate(() => localStorage.clear());
    await delay(500);
  } catch (e) {
    await load(path);
  }
};

/**
 * Wait for selector or fail with message.
 */
const waitForSelector = async (selector, message) => {
  try {
    await page.waitForSelector(selector);
  } catch (e) {
    assert(false, message);
  }
};

/**
 * Find input.
 */
const findInput = async selector => {
  await waitForSelector(selector, `Could not find input ${selector}.`);

  return {
    selector,
    input: await page.$(selector),
  };
};

/**
 * Type into certain input ($eval hack).
 * This is needed cause for whatever reason 'input.type' requires it to be blurred after press.
 */
const type = async ({ selector, input }, string) => {
  await page.$eval(selector, input => (input.value = ''));

  await input.type(string);
  await input.press('Enter');

  // wait 10ms
  await new Promise(resolve => setTimeout(resolve, 10));
};

/**
 * Create a new user flux.
 */
const create = async config => {
  await load('/create');

  const name = await findInput(config.name.selector);
  const email = await findInput(config.email.selector);

  await type(name, config.name.value);
  await type(email, config.email.value);

  const action = await page.$('[data-test="criar"]');

  await action.click();

  await delay(500);

  await assertString(config.name.value, 'Could not find new user in list.');
  await assertString(config.email.value, 'Could not find new user in list.');

  await page.evaluate(() => {
    location.reload(true);
  });

  await delay(500);

  await assertString(
    config.name.value,
    'Could not find new user in list after reload.'
  );
  await assertString(
    config.email.value,
    'Could not find new user in list after reload.'
  );
};

describe('Contact', () => {
  /**
   * Run a first load.
   */
  beforeAll(load);

  it('should redirect to 404 page if contact or page does not exist', async () => {
    await load('/some-random-page');

    assert(
      page.url().indexOf('404') !== -1,
      'Should redirect to 404 if page or contact does not exist.'
    );

    await load('/123123123/edit');

    assert(
      page.url().indexOf('404') !== -1,
      'Should redirect to 404 if page or contact does not exist.'
    );
  });

  it('should have a empty state', async () => {
    await load('/');
    await waitForSelector(
      '[data-test="sem-contatos"]',
      'Could not see empty state in page.'
    );
  });

  it('should have a synced contacts count', async () => {
    await load('/');

    await waitForSelector(
      '[data-test="total-0"]',
      'Contacts count should init at 0.'
    );

    await create({
      email: {
        value: 'alexandre@reakt.dev',
        selector: '[data-test="email"]',
      },
      name: {
        value: 'Alexandre Lara',
        selector: '[data-test="nome"]',
      },
    });

    await waitForSelector(
      '[data-test="total-1"]',
      'Contacts count should be equal to 1.'
    );

    await create({
      name: {
        value: 'Eryc Silvar',
        selector: '[data-test="nome"]',
      },
      email: {
        value: 'eryc@gmail.com',
        selector: '[data-test="email"]',
      },
    });

    await waitForSelector(
      '[data-test="total-2"]',
      'Contacts count should be equal to 2.'
    );

    const remove = await page.$('[data-test="apagar"]');

    await remove.click();

    await delay(50);

    await waitForSelector(
      '[data-test="total-1"]',
      'Contacts count should be equal to 1.'
    );
  });

  it('should be able to create, edit and remove a contact and persist info', async () => {
    await create({
      name: {
        value: 'Alexandre Lara',
        selector: '[data-test="nome"]',
      },
      email: {
        value: 'alexandre@reakt.com',
        selector: '[data-test="email"]',
      },
    });

    const edit = await page.$('[data-test="editar"]');

    await edit.click();

    await delay(500);

    assert(
      (await page.url().indexOf('/edit')) !== -1,
      'Should redirect to edit page.'
    );

    const name = await findInput('[data-test="nome"]');

    await type(name, 'React Course');

    const save = await page.$('[data-test="salvar"]');

    await save.click();

    await delay(500);

    assert(
      (await page.url().indexOf('/edit')) == -1,
      'Should redirect to list after save.'
    );

    await assertString('React Course', 'Could not find new user name in list.');

    const remove = await page.$('[data-test="apagar"]');

    await remove.click();

    await delay(50);

    await assertString(
      'React Course',
      'Could not remove user from list.',
      true
    );
  });
});
