'use strict';

const path = require('path');
const defaultConfig = {
  description: 'no notes',
  notes: 'no description',
  tags: ['api'],
};

module.exports = (server, handlers, validations) => {
  server.route({
    method: 'POST',
    path: '/accounts/{account}/sessions/{session}/upload',
    config: _.assign({}, defaultConfig, {
      handler: handlers.files.upload,
      validate: validations.files.upload,
      payload: {
        maxBytes: 209715200, // 200 Mo
        output: 'stream',
        parse: true
      }
    })
  });

  server.route({
    method: 'DELETE',
    path: '/accounts/{account}/sessions/{session}/{filename}',
    config: _.assign({}, defaultConfig, {
      handler: handlers.files.remove,
      validate: validations.files.remove
    })
  });

  server.route({
    method: 'GET',
    path: '/accounts/{account}/sessions/{session}',
    config: {
      handler: handlers.files.findAll,
      validate: validations.files.findAll,
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    config: _.assign({}, defaultConfig, {
      description: 'download a file',
      handler: {
        directory: {
          path: path.join(__dirname, '../domains/storage'),
          listing: true
        }
      }
    })
  });
};
