const assert = require('assert');
const app = require('../../src/app');

describe('\'warning-text\' service', () => {
  it('registered the service', () => {
    const service = app.service('warning-text');

    assert.ok(service, 'Registered the service');
  });
});
