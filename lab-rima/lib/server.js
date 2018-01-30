'use strict';

// Application dependencies
const express = require('express');
const errorHandler = require('./error-handler');


// Applicaiton setup
const app = express();
const router = express.Router();
require('../route/route-book')(router);
app.use('/api/v1', router);


// Route setup
app.use(/*'/*'*/'/{0,}', (req, res) => {
  errorHandler(new Error('Path Error. Route not found.'), res);
});


// Server controls
const server = module.exports = {};
server.isOn = false;


server.start = function(port, callback){
  if(server.isOn){
    return callback(new Error('Server running.'));
  }
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = function(callback){
  if(!server.isOn){
    return callback(new Error('Server not running.'));
  }
  server.isOn = false;
  // callback needed?
  return app.close(callback);
};
