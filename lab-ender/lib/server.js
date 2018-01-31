'use strict';

// application dependencies
const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler');

// application setup
const app = express();
const router_img = express.Router();
app.use('/api/v1', router_img);
app.use(cors);

// route setup
require('../route/route-img')(router_img);
app.use('/{0,}', (req, res) => {
  errorHandler(new Error('Path Error: Route not found.'), res);
});

// server controls
const server = module.exports = {};
server.isOn = false;
server.http = null;

server.start = function(port, cb) {
  if (server.isOn) {
    return cb(new Error('Error: Server running. Cannot start server again.'));
  }
  server.isOn = true;
  server.http = app.listen(port, cb);
};

server.stop = function(cb) {
  if (!server.isOn) {
    return cb(new Error('Server not running. Cannot stop server.'));
  }
  server.isOn = false;
  server.http = app.close(cb);
};
