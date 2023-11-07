const assert = require('assert');
const app = require('../../src/app');

describe('\'platform-fee\' service', () => {
  it('registered the service', () => {
    const service = app.service('platform-fee');

    assert.ok(service, 'Registered the service');
  });
});
