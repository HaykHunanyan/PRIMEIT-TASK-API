const assert = require('assert');
const app = require('../../src/app');

describe('\'deposit\' service', () => {
  it('registered the service', () => {
    const service = app.service('deposit');

    assert.ok(service, 'Registered the service');
  });
});
