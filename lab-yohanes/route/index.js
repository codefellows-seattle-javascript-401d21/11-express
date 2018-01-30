'use strict'

if (process.env.NODE_ENV !== 'production') require('dotenv').config() //if you want to make it a dev dependnency i think

const server = require('./lib/server')
server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))