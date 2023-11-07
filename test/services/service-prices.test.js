const assert = require('assert');
const app = require('../../src/app');

describe('\'service-prices\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-prices');

    assert.ok(service, 'Registered the service');
  });
});
