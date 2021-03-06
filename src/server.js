const hapi = require('hapi');
//const secret = require('./config');
const initializeDB = require('./db');
const validate = require('./auth');

const HANDLERS = require('./handlers/handlers');

const serve = async () => {
  // Create server
  const server = new hapi.server({
    port: process.env.PORT || 4001,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  });
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
        env: 'NODEJS',
        autoload: true,
        autosave: true,
        autosaveInterval: 4000
      }
    });
    // AUTH
    await server.register(require('hapi-jsonwebtoken'));
    
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

serve();