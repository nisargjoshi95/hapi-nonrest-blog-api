const bcrypt = require('bcrypt');

const hashPass = (pass, cb) => {
  // Generate salt @ level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

module.exports = hashPass;