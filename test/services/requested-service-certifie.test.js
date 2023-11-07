const assert = require('assert');
const app = require('../../src/app');

describe('\'requested-service-certifie\' service', () => {
  it('registered the service', () => {
    const service = app.service('requested-service-certifie');

    assert.ok(service, 'Registered the service');
  });
});
