const rp = require('request-promise');

const data = 'blahblah';

rp({
  method: 'POST',
  uri: 'http://localhost:4001/api',
  headers: { 'content-type': 'application/json' },
  body: {
    action: 'VERIFY_USER',
    data,
  },
  json: true
}).then((parsedBody) => {
  console.log(parsedBody);
  // POST succeeded...
}).catch((err) => console.error(err));