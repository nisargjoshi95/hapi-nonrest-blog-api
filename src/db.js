const dbInit = (db) => {
  const posts = db.addCollection('posts');
  const users = db.addCollection('users');

  const testPost0 = posts.insert({
    title: 'Test Title',
    author: 'Nisarg Joshi',
    createdAt: new Date(),
    description: 'this is an article',
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

  const testPost1 = posts.insert({
    title: 'Why I Use React Over Angular',
    author: 'Nisarg Joshi',
    createdAt: new Date(),
    description: 'An all too common question for new web developers.',
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

  const testPost2 = posts.insert({
    title: 'Hapi vs. Express',
    author: 'Nisarg Joshi',
    createdAt: new Date(),
    description: 'Configuration vs. code, and the effects on modularity.',
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

  const user = users.insert({
    username: 'nisu',
    password: '$2b$10$F8J8NceC2UOyxsBVTpT6BOSP0P1vygZ.jVrSyHxSqy/sgPu3mevOO'
  });
};

module.exports = dbInit;