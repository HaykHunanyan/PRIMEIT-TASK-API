const assert = require('assert');
const app = require('../../src/app');

describe('\'lawyer-services\' service', () => {
  it('registered the service', () => {
    const service = app.service('lawyer-services');

    assert.ok(service, 'Registered the service');
  });
});
