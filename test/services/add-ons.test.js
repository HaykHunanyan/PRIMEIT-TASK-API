const assert = require('assert');
const app = require('../../src/app');

describe('\'add-ons\' service', () => {
  it('registered the service', () => {
    const service = app.service('add-ons');

    assert.ok(service, 'Registered the service');
  });
});
