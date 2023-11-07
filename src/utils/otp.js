const otpGenerator = require('otp-generator');
const moment = require('moment');
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(10, {
    upperCaseAlphabets: true,
    specialChars: true,
  });
  return `o:${OTP}:${moment().unix()}`;
};
