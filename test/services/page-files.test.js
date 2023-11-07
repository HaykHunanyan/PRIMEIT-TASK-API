const assert = require('assert');
const app = require('../../src/app');

describe('\'page-files\' service', () => {
  it('registered the service', () => {
    const service = app.service('page-files');

    assert.ok(service, 'Registered the service');
  });
});
