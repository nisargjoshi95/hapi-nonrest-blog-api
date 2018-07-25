const rp = require('request-promise');
const bcrypt = require('bcrypt');

const data1 = {
  username: 'something',
  password: 'somethingelse'
}

const data = {
  title: 'Why I use React over ',
  author: 'Nisarg Joshi',
  createdAt: Date.now(),
  content: 'blah blah blah blah',
  tags: ['computer science', 'web development'],
  favorites: 7,
  comments: [
    {
      username: 'billybobjoe',
      comment: 'i love this'
    }
  ]
};

rp({
  method: 'POST',
  uri: 'http://localhost:4001/api',
  headers: { 'content-type': 'application/json' },
  body: {
    action: 'GET_ALL_POSTS',
    data: {
      postId: 1,
      updatedPost: {
        title: 'Second post',
        content: 'this is another post'
      }
    },
  },
  json: true
}).then((parsedBody) => {
  console.log(parsedBody);
  // POST succeeded...
}).catch((err) => console.error(err));

console.log(bcrypt.hashSync('semi34[]radix**', 10));