'use strict';

module.exports = (server, domains) => {
  const handlers = require('./handlers')(domains);
  const validate = require('./validations')();

  require('./routes')(server, handlers, validate);
};
