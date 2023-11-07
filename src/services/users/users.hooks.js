const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { BadRequest } = require('@feathersjs/errors');
const verifyHooks = require('feathers-authentication-management').hooks;
const { hashPassword, protect } =
  require('@feathersjs/authentication-local').hooks;
const { ADMIN } = require('../../constants/roles');
const { adminError } = require('../../constants/error');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [authenticate('jwt')],
    create: [
      verifyHooks.addVerification('authManagement'),
      hashPassword('password'),
    ],
    update: [
      hashPassword('password'),
      authenticate('jwt'),
      commonHooks.disallow('external'),
    ],
    patch: [
      authenticate('jwt'),
      async hook => {
        const { token } = hook.data;
        if (!token) {
          authenticate('jwt')(hook);
        }
        if (hook.data?.role) {
          const { role } = hook.params?.user?.dataValues;
          const roleChangedCheck = [ADMIN];
          if (!roleChangedCheck.includes(role)) {
            throw new BadRequest({
              message: adminError,
            });
          }
          // const { cases: casesModel } = models;
          // const cases = await casesModel.findOne({
          //   where: { toUserId: hook.id },
          // });
        }
      },
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          true,
          'email',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ),
        hashPassword('password')
      ),
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      // getRelations
    ],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
