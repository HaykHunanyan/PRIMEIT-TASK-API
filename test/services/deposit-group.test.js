const assert = require('assert');
const app = require('../../src/app');

describe('\'deposit-group\' service', () => {
  it('registered the service', () => {
    const service = app.service('deposit-group');

    assert.ok(service, 'Registered the service');
  });
});
