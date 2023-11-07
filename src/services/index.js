const users = require('./users/users.service.js');
const services = require('./services/services.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(services);
};
