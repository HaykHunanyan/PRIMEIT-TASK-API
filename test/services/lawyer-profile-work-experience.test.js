const assert = require('assert');
const app = require('../../src/app');

describe('\'lawyer-profile-work-experience\' service', () => {
  it('registered the service', () => {
    const service = app.service('lawyer-profile-work-experience');

    assert.ok(service, 'Registered the service');
  });
});
