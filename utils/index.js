const bcrypt = require('bcryptjs');

module.exports = {

  errorMessage: 'Server Error! We will fix this as soon as possible. If you have any questions, send an email at zubeir.mohamed@outlook.de. Thank you ', 
  
  // Get access token from header
  getAccessToken(req) {
    const header = req.get('Authorization');
    const tokenarr = header.split(' ');
    return tokenarr[1];
  },

  hash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
};
