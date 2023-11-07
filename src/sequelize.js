const Sequelize = require('sequelize');
const logger = require('./logger');

module.exports = function (app) {
  const connectionString = app.get('postgres');
  logger.info(connectionString);
  let sequalizeParams = {
    dialect: 'postgres',
    url: app.get('postgres'),
    logging: false,
    define: {
      freezeTableName: true,
    },
  };
  sequalizeParams = {
    ...sequalizeParams,
    ssl: { rejectUnauthorized: false },
    dialectOptions: {
      ssl: false,
      rejectUnauthorized: false,
    },
  };
  const sequelize = new Sequelize(connectionString, sequalizeParams);

  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set(
      'sequelizeSync',
      sequelize.sync({
        force: false,
      })
    );

    return result;
  };
};
