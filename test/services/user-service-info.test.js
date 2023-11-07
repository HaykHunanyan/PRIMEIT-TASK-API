const assert = require('assert');
const app = require('../../src/app');

describe('\'user-service-info\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-service-info');

    assert.ok(service, 'Registered the service');
  });
});
