const assert = require('assert');
const app = require('../../src/app');


describe('\'billing-info\' service', () => {
  it('registered the service', () => {
    const service = app.service('billing-info');
    assert.ok(service, 'Registered the service');
  });
});
