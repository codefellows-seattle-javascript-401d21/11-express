'use strict'

// Application dependencies
const express = require('express')
const errorHandler = require('./error-handler')

const app = express()
const router = express.Router()

app.use('/api/v1', router)
// app.use body parser - applies package to every rout int he app

// route setup
require('../route/route-note')(router)
app.use('/*', (req, res) => errorHandler(new Error('path error - route not found.'), res))

// server contorls/
const server = module.exports = {}

server.isOn = false


server.start = function(port, callback){
    if(server.isOn) return callback(new Error('Server running. cannot start server again.'))
    server.isOn = true
    return app.listen(port, callback)
}


server.stop = function(callback){
    if(!server.isOn) return callback(new Error('server not running - do not do this.'))
    server.isOn = false
    return app.close(callback)
}