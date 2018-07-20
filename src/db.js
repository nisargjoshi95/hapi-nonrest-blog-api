const dbInit = (db) => {
  const posts = db.addCollection('posts');
  const users = db.addCollection('users');

  const testPost = posts.insert({
    title: 'Test Title',
    author: 'Nisarg Joshi',
    createdAt: Date.now(),
    content: 'blah blah blah blah',
    tags: ['computer science', 'web development'],
    favorites: 0,
    comments: [
      {
        username: 'billybobjoe',
        comment: 'i love this'
      }
    ]
  });

  const testUser = users.insert({
    username: 'nisu',
    password: '$2b$10$F8J8NceC2UOyxsBVTpT6BOSP0P1vygZ.jVrSyHxSqy/sgPu3mevOO'
  });
};

module.exports = dbInit;