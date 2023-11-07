const assert = require('assert');
const app = require('../../src/app');

describe('\'servicePlanPrices\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-plan-prices');

    assert.ok(service, 'Registered the service');
  });
});
