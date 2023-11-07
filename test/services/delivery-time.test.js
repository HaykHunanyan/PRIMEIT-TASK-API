const assert = require('assert');
const app = require('../../src/app');

describe('\'delivery-time\' service', () => {
  it('registered the service', () => {
    const service = app.service('delivery-time');

    assert.ok(service, 'Registered the service');
  });
});
