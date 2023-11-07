const assert = require('assert');
const app = require('../../src/app');

describe('\'ticketMessages\' service', () => {
  it('registered the service', () => {
    const service = app.service('ticket-messages');

    assert.ok(service, 'Registered the service');
  });
});
