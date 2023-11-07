const assert = require('assert');
const app = require('../../src/app');


describe('\'service-categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-categories');
    assert.ok(service, 'Registered the service');
  });
});
