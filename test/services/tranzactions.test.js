const assert = require('assert');
const app = require('../../src/app');

describe('\'tranzactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('tranzactions');

    assert.ok(service, 'Registered the service');
  });
});
