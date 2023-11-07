const { BadRequest } = require('@feathersjs/errors');
const axios = require('axios');
const {
  AuthenticationService,
  JWTStrategy,
} = require('@feathersjs/authentication');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const MyLocalStrategy = require('./MyLocalStrategy');
const { protect } = require('@feathersjs/authentication-local').hooks;
const { OAuthStrategy } = require('@feathersjs/authentication-oauth');
const roles = require('./constants/roles');
const CryptoJS = require('crypto-js');

class LinkedinStrategy extends OAuthStrategy {
  async getEmail(accessToken){
    const { data }  = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      params: {
      }
    });

    const newData = data.elements[0]['handle~'];
    const email = newData?.emailAddress;
    return email;
  }
  async getProfile (authResult) {
    // This is the OAuth access token that can be used
    // for LinkedIn API requests as the Bearer token
    const accessToken = authResult.access_token;
    const email = await this.getEmail(accessToken);
    const { data } = await axios.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))', {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      params: {
      }
    });
    const image = data?.profilePicture['displayImage~']?.elements[0]?.identifiers[0]?.identifier;
    delete data?.profilePicture;
    return {
      ...data,
      strategy: 'linkedin',
      firstName:  data?.localizedFirstName,
      lastName:  data?.localizedLastName,
      email: email,
      accountType: roles.LAWYER,
      password: '123@123',
      repeatPassword: '123@123',
      photo:image
    };
  }

  async getEntityData(profile) {
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile);
    console.log('getEntityData base', baseData);

    return profile;
  }
}

module.exports = app => {
  const { models } = app.get('sequelizeClient');
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new MyLocalStrategy());
  authentication.register('linkedin', new LinkedinStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
  app.service('authentication').hooks({
    before: {
      all: [],
      create: [
        async hook => {
          const { email, logInOut } = hook.data;
          console.log('before authentication', hook.data);
          if (email && !logInOut) {
            const user = await models.users.findOne({
              where: { email },
            });
            if (user && !user.isVerified) {
              throw new BadRequest({
                message: 'User email is not yet verified',
                redirect: true,
                type: 'NotVerified',
              });
            }
          }
          const { strategy } = hook.data;
          if  (strategy === 'linkedin') {
            const {error} = hook.data;
            console.log('before authentication error', error);
            if (error) {
              const redirectURI = hook.app.get('CLIENT_URL');
              const SECRET_KEY = hook.app.get('OAUTH_SECRET_KEY');
              let redirectData = 'error=' + error.error_description;
              redirectData = CryptoJS.AES.encrypt(redirectData, SECRET_KEY).toString();
              redirectData = '/oauth-result?' + redirectData;
              console.log('before authentication', redirectData);
              hook.params.res.redirect(redirectURI + redirectData);
            }
          }
        },
      ],
      remove: [],
    },
    after: {
      all: [protect('password')],
      create: [
        async hook => {
          console.log('after authentication', hook.data);
          const { email, logInOut } = hook.data;
          const { strategy } = hook.data;
          if  (strategy === 'linkedin'){
            const { user } = hook.result;
            if(user){
              let pass = await hook.app.service('utils').create({
                action: 'otp',
                email: user.email
              });
              const redirectURI = hook.app.get('CLIENT_URL');
              const SECRET_KEY = hook.app.get('OAUTH_SECRET_KEY');
              let redirectData = 'email='+ user.email + '&pass=' + pass;
              console.log('after authentication', redirectData);
              redirectData = CryptoJS.AES.encrypt(redirectData, SECRET_KEY).toString();
              redirectData = '/oauth-result?' + redirectData;
              console.log('after authentication', redirectData, SECRET_KEY);
              hook.params.res.redirect(redirectURI + redirectData);
            }
          }

          if (email && !logInOut) {
            await models.users.update(
              {
                otp: '',
              },
              { where: { email } }
            );
          }
        },
      ],
    },
  });
};
