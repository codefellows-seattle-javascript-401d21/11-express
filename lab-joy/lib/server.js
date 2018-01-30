'use strict';

// app dependencies
const express = require('express');
const errorHandler = require('./error-handler');

// app setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);

// route setup
require ('../route/route-note')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

// server controls
const server = module.exports = {};
server.isOn = false;

server.start = (port, cb) => {
    if (server.isOn) return cb(new Error('Server running. Cannot start server again'));
    server.isOn = true;
    return app.listen(port, cb);
};

server.stop = cb => {
    if (!server.isOn) return cb(new Error('Server is not running. Cannot stop the server.'));
    server.isOn = false;
    return app.close(cb);
};