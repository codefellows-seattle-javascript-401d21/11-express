'use strict';

const express = require('express');
const errorHandler = require('./error-handler');

const app = express();
const router = express.Router();
app.use('/api/v1', router);

require('../route/route-img');
app.use('.*', (req, res) => {
  errorHandler(new Error('Path Error: Route not found.'), res);
});

server.start = function(port, cb) {
  if (server.isOn) {
    return cb(new Error('Error: Server running. Cannot start server again.'));
  }
  server.isOn = true;
  return app.listen(port, cb);
};

server.stop = function(cb) {
  if (!server.isOn) {
    cb(new Error('Server not running. Cannot stop server.'));
  }
  server.isOn = false;
  return app.close(cb);
};
