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
  debug('Fetched a thing');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

storage.fetchAll = (schema) => {
  debug('Fetched all things');
  return fs.readdirProm(`${__dirname}/../data/${schema}`);
};

storage.update = (schema, itemId, item) => {
  debug('Updated a thing');
  let json = JSON.stringify(item);
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => {
      fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json);
    });
};

storage.destroy = (schema, itemId) => {
  debug('Destroyed a thing');
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};
