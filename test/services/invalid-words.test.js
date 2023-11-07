const assert = require('assert');
const app = require('../../src/app');

describe('\' invalid-words\' service', () => {
  it('registered the service', () => {
    const service = app.service('invalid-words');

    assert.ok(service, 'Registered the service');
  });
});
