'use strict';

//Aplication dependancies
const express = require('express');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server');

//Application Set Up
const app = express();
const router = express.Router();
app.use('/api/v1', router);

//Route set up
require('../route/route-note')(router);
app.use('/{0,}', (req, res) => errorHandler(new Error ('Path Error. Route not found.'), res));

//Server controls
const server = module.exports = {};
debug('server');
server.isOn = false;

server.start = function (port, callback) {
  if(server.isOn) return callback(new Error ('Server running.  cannot start again.'));
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error ('Server not running.  Cannot stop.'));
  server.isOn = false;
  return app.close(callback);
};
