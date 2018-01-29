'use strict';

// Application dependencies

const express = require('express');
const errorHandler = require('./error-handler');


// Application setup 

const app = express();
const router = express.Router();
app.use('/api/v1', router);
// app.use(bodyParser) // Globally will creare more work for our server. run it in the route-note to before you send the request

// Router setup

require('../route/route-note')(router);
//require('../route/route-category')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Router not found'), res));
// catch all error



// Server controls 
const server = module.exports = {};
server.isOn = false;

server.start = function(port, callback) {
  if (server.isOn) return callback(new Error('Server runnning. Cannot satrt server again'));
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = function (callback) {
  if(!server.isOn) return callback(new Error('Server not runnnig. You\'re dumb. Don\'t do that.'));
  server.isOn = false;
  return app.close(callback);
};