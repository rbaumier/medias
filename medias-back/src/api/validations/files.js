'use strict';

module.exports = (Joi) => {
  const Readable = require('stream').Readable;
  const params = {
    account: Joi.string().required(),
    session: Joi.string().required()
  }

  return {
    upload: {
      params
    },

    findAll: {
      params
    },

    download: {
      params
    },

    remove: {
      params: _.assign({}, params, {
        filename: Joi.string().required()
      })
    }
  }
};
