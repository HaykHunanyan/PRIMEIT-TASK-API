const assert = require('assert');
const app = require('../../src/app');

describe('\'faqs\' service', () => {
  it('registered the service', () => {
    const service = app.service('faqs');

    assert.ok(service, 'Registered the service');
  });
});
