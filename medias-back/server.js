'use strict';
require('./bootstrap');

const Hapi = require('hapi');
const server = new Hapi.Server();
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const packageJSON = require('./package');

server.connection({
  host: 'localhost',
  port: config.api.port,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true
    }
  }
});

server.register([Inert, Vision, {
  register: HapiSwagger,
  options: {
    info: {
      title: packageJSON.name,
      version: packageJSON.version,
    }
  },
  routes: {
    prefix: '/api'
  }
}], error => {
  require('./src')(server);
  server.start(err => {
    console.log(error || err || `Server running at ${server.info.uri}`);
  });
});
