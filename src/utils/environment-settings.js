const { NODE_ENV } = process.env;

/**
 * Env settings  pull all relevant logic into this file
 * @type {{isTest: boolean, isProd: boolean, isDev: boolean}}
 */
module.exports = {
  isTest: (NODE_ENV === 'test'),
  isDev: (NODE_ENV === 'development' || NODE_ENV === '')
};
