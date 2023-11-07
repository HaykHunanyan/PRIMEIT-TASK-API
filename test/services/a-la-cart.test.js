const assert = require('assert');
const app = require('../../src/app');

describe('\'aLaCart\' service', () => {
  it('registered the service', () => {
    const service = app.service('a-la-cart');

    assert.ok(service, 'Registered the service');
  });
});
