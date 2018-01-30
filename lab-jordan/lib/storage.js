'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = module.exports = {};

storage.create = (schema, item) => {
  debug('created a thing');

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
  .then(() => item);
}

storage.fetchOne = (schema, itemId) => {
  debug('fetched a thing');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
}

storage.fetchAll = (schema) => {
  debug('fetched things');
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
  .then(data => data.map(id => id.split('.')[0]))
}

storage.update = (schema, itemId, item) => {
  debug('updated a thing');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${item._id}.json`)
  .then(data => data.toString())
    .then(json => JSON.parse(json))
    .then(oldData => {
      return {
        name: item.name || oldData.name,
        data: item.data || oldData.data,
        _id: oldData._id,
      }
    })
    .then(JSON.stringify)
    .then(json => fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json))
}

storage.destroy = (schema, itemId) => {
  debug('destroyed a thing');
}
