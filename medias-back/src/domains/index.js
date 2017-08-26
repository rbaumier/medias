'use strict';

module.exports = () => {
  return {
    FileRepository: require('./File.Repository')()
  };
};
