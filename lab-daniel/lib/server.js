'use strict';

// App dependencies
const express = require('express');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server');


// App setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);

// Route setup
require('../route/route-note')(router);
app.use('/{0}', (req, res) => {
  let err = new Error('Path Error: Route not found.');
  return errorHandler(err, res);
});

// Server controls

const server = module.exports = {};
server.isOn = false;

server.start = (port, cb) => {
  debug('Begin Server Run');
  if (server.isOn) return cb(new Error('Server running. Cannot start server again'));
  server.isOn = true;
  return app.listen(port, cb);
};

server.stop = (cb) => {
  debug('Begin Server Close');
  if (!server.isOn) return cb(new Error('Server not running. Cannot stop server that is not running'));
  server.isOn = false;
  return app.close(cb);
};