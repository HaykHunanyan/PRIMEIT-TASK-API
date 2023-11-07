const assert = require('assert');
const app = require('../../src/app');

describe('\'lawyer-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('lawyer-profile');

    assert.ok(service, 'Registered the service');
  });
});
