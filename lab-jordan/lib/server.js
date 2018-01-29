'use strict';

// dependencies
const express = require('express');
const errorHandler = require('./error-handler');

// app setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);

// route setup
require('../route/route-note')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.')));

// server controlls
const server = module.exports = {};
server.isOn = false;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server running. Cannot start server again.'));
  return app.listen(port, callback);
}

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running.'));
  server.isOn = false;
  return app.close(callback);
}
