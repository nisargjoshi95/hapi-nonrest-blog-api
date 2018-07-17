const hapi = require('hapi');
const config = require('config');
const joi = require('joi');
const bcrypt = require('bcrypt');
const glob = require('glob');
//const secret = require('./config');
const initializeDB = require('./db');
const validate = require('./auth');

const HANDLERS = require('./handlers');

const server = new hapi.server({
  port: 4001,
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
    // Inject db reference into server object & route requests
    await server.register({
      plugin: require('lokijs-plugin'),
      options: {
        env: 'NODEJS'
      }
    })
    // AUTH
    await server.register(require('hapi-auth-basic'));
    server.auth.strategy('simple', 'basic', { validate });
  } catch(err) {
    console.log('Error registering plugin:', err);
  }

  // DB SETUP


  // ROUTES
  // TODO: BREAK OUT ROUTES INTO SEPARATE FILE/FOLDER STRUCTURE
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (req, reply) => {
        console.log(server.app.db)
        return `TEST`
      }
    },
    {
      method: 'GET',
      path: '/dashboard',
      handler: (req, reply) => `ONLY FOR AUTHENTICATED USERS`
    },
    {
      method: 'POST',
      path: '/api',
      handler: (req, reply) => {
        const handler = HANDLERS[req.payload.action];
        console.log('payload', req.payload, handler);
        return `test reply`;
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