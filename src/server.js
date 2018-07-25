const hapi = require('hapi');
const https = require('https');
//const secret = require('./config');
const initializeDB = require('./db');
const validate = require('./auth');

const HANDLERS = require('./handlers/handlers');

// SSL SETUP
const greenlock = require('greenlock-hapi').create({
  version: 'draft-11', // Let's Encrypt V2
  server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
  email: 'nisarg.joshi.95@gmail.com',
  agreeTos: true,
  approveDomains: ['websight.tech', 'https://websight.tech'],
  configDir: require('os').homedir() + '/acme/etc'
});

const acmeResponder = greenlock.middleware();
const httpsServer = https.createServer(greenlock.httpsOptions).listen(4001);

const server = new hapi.server({
  //port: 4001,
  routes: {
    cors: {
      origin: ['localhost:4000', 'localhost:8080']
    }
  },
  tls: true,
  listener: httpsServer,
  autoListen: false
});

const serve = async () => {
  // REGISTER PLUGINS
  try {
    // Pretty dev errors
    await server.register({
      plugin: require('hapi-dev-errors'),
      options: {
        showErrors: process.env.NODE_ENV !== 'production'
      }
    });
    // Instantiate & inject db reference into server object & route requests
    await server.register({
      plugin: require('lokijs-plugin'),
      options: {
        env: 'NODEJS'
      }
    });
    // AUTH
    await server.register(require('hapi-auth-basic'));
    server.auth.strategy('simple', 'basic', { validate });
    // HTTPS
    await server.register(require('hapi-require-https'));
  } catch(err) {
    console.log('Error registering plugin:', err);
  }

  // DB SETUP
  initializeDB(server.app.db);

  // ROUTES
  // TODO: BREAK OUT ROUTES INTO SEPARATE FILE/FOLDER STRUCTURE
  server.route([
    {
      method: 'GET',
      path: '/.well-know/acme-challenge',
      handler: (req, reply) => {
        let request = req.raw.req;
        let response = req.raw.res;

        reply.close(false);
        acmeResponder(request, response);
      }
    },
    {
      method: 'GET',
      path: '/',
      config: {
        state: {
          parse: false, // parse and store in request.state
          failAction: 'ignore' // may also be 'ignore' or 'log'
        }
      },
      handler: (req, reply) => {
        return `TEST`
      }
    },
    {
      method: 'GET',
      path: '/dashboard',
      options: {
        auth: 'simple'
      },
      handler: (req, reply) => `ONLY FOR AUTHENTICATED USERS`
    },
    {
      method: 'POST',
      path: '/api',
      handler: (req, reply) => {
        const handler = HANDLERS[req.payload.action];
        if(handler) {
          return handler(req, reply);
        } else {
          console.error(`${req.payload.action} doesn't have a handler`);
          reply.sendStatus(500);
        }
      }
    }
  ]);

  // START SERVER
  try {
    await server.start();
    console.log('info', `Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// serve();


//
// http redirect to https
//
var http = require('http');
var redirectHttps = require('redirect-https')();

http.createServer(greenlock.middleware(redirectHttps)).listen(4000, () => {
  console.log('Listening on port 4000 to handle ACME http-01 challenge and redirect to https');
});