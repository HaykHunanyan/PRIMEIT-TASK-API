const assert = require('assert');
const app = require('../../src/app');

describe('\'transfers\' service', () => {
  it('registered the service', () => {
    const service = app.service('transfers');

    assert.ok(service, 'Registered the service');
  });
});
