const assert = require('assert');
const app = require('../../src/app');

describe('\'customer-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('customer-profile');

    assert.ok(service, 'Registered the service');
  });
});
