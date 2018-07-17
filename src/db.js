const loki = require('lokijs');

const dbInit = (db) => {
  const posts = db.addCollection('posts');
  const users = db.addCollection('users');

  const testPost = posts.insert({
    title: 'Test Title',
    author: 'Nisarg Joshi',
    createdAt: Date.now(),
    content: 'blah blah blah blah',
    favorites: 0,
    comments: [
      {
        user: 'billybobjoe',
        comment: 'i love this'
      }
    ]
  });

  const testUser = users.insert({
    username: 'nisu',
    password: 'hashedpass',
    email: 'nj95@protonmail.com'
  });

  console.log(users.findOne({username: 'nisu'}))
};

module.exports = dbInit;