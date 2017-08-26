'use strict';


module.exports = (server) => {
  const domains = require('./domains')();
  const api = require('./api')(server, domains);
};
