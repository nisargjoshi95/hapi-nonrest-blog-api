const ACTIONS = require('./actions');

const handlers = {
  [ACTIONS.VERIFY_USER]: (req, reply) => {
    console.log('verify user');
  },

};

module.exports = handlers;