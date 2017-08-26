'use strict';

module.exports = ({ FileRepository }) => {
  return {
    files: {
      upload(request, reply) {
        const { account, session } = request.params;
        FileRepository.save(account, session, request.payload, (err) => {
          err ? reply(Boom.wrap(err)) : reply();
        });
      },

      findAll(request, reply) {
        const { account, session } = request.params;
        FileRepository.findAll(account, session, (err, files) => {
          err ? reply(Boom.wrap(err)) : reply(files);
        });
      },

      remove(request, reply) {
        const { account, session, filename } = request.params;
        FileRepository.remove(account, session, filename, (err) => {
          err ? reply(Boom.wrap(err)) : reply();
        });
      }
    }
  };
};
