'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
// const debug = require('debug')('http:storage');
const storage = module.exports = {};

storage.create = (schema, item) => {
  console.log('insode storage create');
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

storage.fetchAll = (schema) => {
  console.log('inside fetchAll');
  return fs.readdirProm(`${__dirname}/../data/${schema}`);

};


storage.destroy = (schema, itemId) => {
  console.log('deleting file', itemId);
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};



storage.update = (schema, itemId, item) => {

  if(!schema) return Promise.reject(new Error('Cannot update. Schema required.'));
  if(!itemId) return Promise.reject(new Error('Cannot update. Item ID required.'));
  if(!item) return Promise.reject(new Error('Cannot update. Item required.'));
  if(itemId !== JSON.parse(item)._id) return Promise.reject(new Error('Validation error, Cannot update. Invalid ID'));

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, item);

};
