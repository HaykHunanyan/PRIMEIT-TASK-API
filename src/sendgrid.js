const sgMail = require('@sendgrid/mail');

module.exports = app => {
  const api_key = app.get('SENDGRID_API_KEY');
  sgMail.setApiKey(api_key);
  app.set('sendgrid', sgMail);
};
