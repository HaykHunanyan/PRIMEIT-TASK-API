const assert = require('assert');
const app = require('../../src/app');

describe('\'userBilling\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-billing');

    assert.ok(service, 'Registered the service');
  });
});
