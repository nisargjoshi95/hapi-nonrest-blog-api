const bcrypt = require('bcrypt');

const validate = async(request, username, password) => {
  const user = request.app.db.getCollection('users').findOne({ username });
  if(!user) {
    return {
      credentials: null,
      isValid: false
    }
  }

  const isValid = await bcrypt.compare(password, user.password);
  const credentials = {
    id: user.id,
    name: user.username
  }

  return {
    isValid,
    credentials
  };
};

module.exports = validate;