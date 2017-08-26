'use strict';

const Joi = require('joi');

module.exports = () => {
  return {
    files: require('./files')(Joi)
  };
};
