const assert = require('assert');
const app = require('../../src/app');

describe('\'stripe\' service', () => {
  it('registered the service', () => {
    const service = app.service('stripe');

    assert.ok(service, 'Registered the service');
  });
});
