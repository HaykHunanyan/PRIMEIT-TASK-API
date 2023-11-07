const assert = require('assert');
const app = require('../../src/app');

describe('\'roomUsers\' service', () => {
  it('registered the service', () => {
    const service = app.service('room-users');

    assert.ok(service, 'Registered the service');
  });
});
