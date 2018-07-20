const bcrypt = require('bcrypt');
const ACTIONS = require('./actions');

const postHandlers = require('./postHandlers');

const handlers = {
  [ACTIONS.VERIFY_USER]: (req, reply) => {
    const {username, password} = req.payload.data;
    if(username && password) {
      const users = req.app.db.getCollection('users');
      const user = users.findOne({username});
      if(user) {
        const validPass = bcrypt.compareSync(password, user.password);
        return validPass ? `VERIFIED`: `WRONG PASSWORD`;
      } else {
        return `USER NOT FOUND`;
      }
    }
  },
  [ACTIONS.ADD_USER]: (req, reply) => {
    const {username, password} = req.payload.data;
    console.log(username, password)
    if(username && password) {
      const users = req.app.db.getCollection('users');
      const newUser = users.insert({
        username,
        password, // MAKE SURE THIS IS SENT HASHED
      });
      return newUser;
    }
  },
  [ACTIONS.POSTS.CREATE]: postHandlers.createPost,
  [ACTIONS.POSTS.GET_ALL]: postHandlers.getAllPosts,
  [ACTIONS.POSTS.GET_POST]: postHandlers.getPost,
  [ACTIONS.POSTS.UPDATE]: postHandlers.updatePost,
  [ACTIONS.POSTS.REMOVE]: postHandlers.deletePost,
};

module.exports = handlers;