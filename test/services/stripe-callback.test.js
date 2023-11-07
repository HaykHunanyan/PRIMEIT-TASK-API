const assert = require('assert');
const app = require('../../src/app');

describe('\'stripe-callback\' service', () => {
  it('registered the service', () => {
    const service = app.service('stripe-callback');

    assert.ok(service, 'Registered the service');
  });
});
