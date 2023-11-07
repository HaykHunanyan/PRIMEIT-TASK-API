const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const crypto = require('./crypto');
const rateLimit = require('express-rate-limit');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const sequelize = require('./sequelize');
const sendgrid = require('./sendgrid');
const sequelizeToJsonSchemas = require('./sequelize-to-json-schemas');
const { Model } = require('objection');
const knex = require('knex')({
  client: 'pg',
});
Model.knex(knex);
// const app = express(feathers());
const app = express(feathers())
  .use(express.json({ limit: '100mb' }))
  .use(express.urlencoded({ limit: '100mb', extended: true }))
  .configure(express.rest());
app.configure(sequelizeToJsonSchemas);
console.log(process.env.NODE_ENV);
// Set up feathers-swagger with auto-generated OpenAPI v3 model schemas

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 1200, // Limit each IP to 400 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);
// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());

app.configure(socketio());

app.configure(sendgrid);

// Configure other middleware (see `middleware/index.js`)
app.configure(sequelize);

// declare this before your services
app.use((req, res, next) => {
  // anything you put on 'req.feathers' will later be on 'params'
  req.feathers.res = res;
  next();
});
app.configure(services);
app.configure(authentication);
// Set up our services (see `services/index.js`)
// Set up event channels (see channels.js)
app.configure(channels);
app.configure(crypto);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);
// app.configure(generateSwagger);

module.exports = app;
