const assert = require('assert');
const app = require('../../src/app');

describe('\'add-ons-duration\' service', () => {
  it('registered the service', () => {
    const service = app.service('add-ons-duration');

    assert.ok(service, 'Registered the service');
  });
});
