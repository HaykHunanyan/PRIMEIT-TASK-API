const assert = require('assert');
const app = require('../../src/app');

describe('\'nylas\' service', () => {
  it('registered the service', () => {
    const service = app.service('nylas');

    assert.ok(service, 'Registered the service');
  });
});
