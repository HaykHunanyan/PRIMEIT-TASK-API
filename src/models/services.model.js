// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const services = sequelizeClient.define(
    'services',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      questionFlow: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  return services;
};
