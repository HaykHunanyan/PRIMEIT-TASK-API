const app = require('../../src/app');
const logger = require('../../src/logger');

app.setup();

const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
logger.info('Connection String(2): %s',app.get(dialect));
logger.info('env: %s',env);

module.exports = {
  [env]: {
    dialect,
    url: app.get(dialect),
    migrationStorageTableName: '_migrations',
    ssl: { rejectUnauthorized: false },
    dialectOptions: {
      ssl: false,
      rejectUnauthorized: false
    },
  },
};
