const assert = require('assert');
const app = require('../../src/app');

describe('\'userChats\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-chats');

    assert.ok(service, 'Registered the service');
  });
});
