'use strict';

const Promise = require('bluebird');
const debug = require('debug')('http:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};


storage.create = (schema, item) => {
  debug('Created a new thing');
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
  debug('Fetched a thing');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

storage.fetchAll = (schema) => {
  debug('Fetched all things');
  return fs.readdirProm(`${__dirname}/../data/${schema}`);
};

storage.update = (schema, itemId, item) => {
  let json = JSON.stringify(item);
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => {
      fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json);
    });
};

storage.destroy = (schema, itemId) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};