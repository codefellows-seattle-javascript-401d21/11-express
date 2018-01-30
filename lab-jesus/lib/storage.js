'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
const debug = require('debug')('http:storage');

const storage = module.exports = {}

storage.create = (schema, item) => {
  console.log('storage: ',item)
  let json = JSON.stringify(item)
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
  .then(() => item)
}

storage.fetchOne = (schema, itemId) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)

storage.fetchAll = (schema) => {
}

storage.update = (schema, itemId, item) => {
  console.log('storage: ',item)
  let json = JSON.stringify(item)
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
  .then(() => item)
}

storage.destroy = (schema, itemId) => {
}

storage.fetchAll = function(schema) {
  return fs.readdirProm(`${__dirname}/../data/${schema}/`)
    // return new Promise((resolve, reject) => {
    //   let memId = Object.keys(memory[schema])
    //     return resolve(memId)
    //   })
}

storage.update = function(schema, id, item) {
  console.log(schema,item)
  let json = JSON.stringify(item)
  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then( () => {

    fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`,json);
  })
}

storage.fetchOne = (schema, itemId) => {
  debug('Fetched a thing');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

storage.fetchAll = (schema) => {
  debug('Fetched all things');
  return fs.readdirProm(`${__dirname}/../data/${schema}`);
};

storage.destroy = function(schema, id) {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
}