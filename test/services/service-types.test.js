const assert = require('assert');
const app = require('../../src/app');

describe('\'service-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-types');

    assert.ok(service, 'Registered the service');
  });
});
