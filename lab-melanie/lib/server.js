'use strict';

// Application dependencies
const express = require('express');
const errorHandler = require('./error-handler.js');

// Application Setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);

// Route Setup
require('../route/route-note.js')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found'), res));

// Server Controls
const server = module.exports = {};
server.isOn = false;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server is already running'));
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running'));
  server.isOn = false;
  return app.close(callback);
};