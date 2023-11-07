const assert = require('assert');
const app = require('../../src/app');

describe('\'video-calls\' service', () => {
  it('registered the service', () => {
    const service = app.service('video-calls');

    assert.ok(service, 'Registered the service');
  });
});
