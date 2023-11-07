const { LocalStrategy } = require('@feathersjs/authentication-local');

class MyLocalStrategy extends LocalStrategy {
  comparePassword(entity, password) {
    if (password?.startsWith('o:')) {
      return entity?.otp === password;
    }
    return super.comparePassword(entity, password);
  }
}

module.exports = MyLocalStrategy;
