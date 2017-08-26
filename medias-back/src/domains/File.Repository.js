'use strict';

const mkdirp = require('mkdirp');
const fs = require('fs');

module.exports = () => {
  const IGNORED_FILES = ['.DS_Store'];
  const getFolder = (account, session) => `${__dirname}/storage/${account}/${session}`;
  const saveFiles = (folder, data, f) => {
    // support one & multi uploads
    if (!_.isArray(data.file)) {
      data.file = [data.file];
    }
    async.map(data.file, (dataFile, cb) => {
      const file = fs.createWriteStream(`${folder}/${dataFile.hapi.filename}`);
      file.on('error', cb);
      file.on('finish', cb);
      dataFile.pipe(file);
    }, f);
  };

  return {
    save(account, session, data, f) {
      if (!data || !data.file) {
        return f(Boom.badRequest('No file provided'));
      }
      const folder = getFolder(account, session);
      mkdirp(folder, (err) => {
        err ? f(Boom.wrap(err)) : saveFiles(folder, data, f);
      });
    },

    findAll(account, session, f) {
      fs.readdir(getFolder(account, session), (err, files) => {
        if (err) {
          return f(null, []); // the folder doesn't exist yet
        }
        f(null, _.pull(files, ...IGNORED_FILES));
      });
    },

    remove(account, session, filename, f) {
      fs.unlink(`${getFolder(account, session)}/${filename}`, f);
    }
  };
};
