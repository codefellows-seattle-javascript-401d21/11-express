'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = module.exports = {};

storage.create = (schema, item) => {
  debug('Storage.create');
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
  debug('Storage.fetchOne');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};


storage.fetchAll = (schema) => {
  debug('Storage.fetchAll');
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then(data => data.map(id => id.split('.')[0]));
};

storage.update = (schema, itemId, item) => {
  debug('Storage.update');
  let json = JSON.stringify(item);
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => {
      fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json);
    });
};

storage.destroy = (schema, itemId) => {
  debug('Storage.destroy');
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};
