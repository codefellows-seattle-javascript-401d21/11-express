'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
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
// storage.update = (schema, itemId, item) => {
// };

storage.destroy = (schema, itemId) => {
  console.log('deleting file', itemId);
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};



storage.update = function(schema, itemId, item) {

  if(!schema) return (new Error('Cannot update. Schema required.'));
  if(!itemId) return (new Error('Cannot update. Item ID required.'));
  if(!item) return (new Error('Cannot update. Item required.'));
  if(item._id !== itemId) return (new Error('Cannot update. Invalid ID'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(data => data.toString())
    .then(json => JSON.parse(json))
    .then(oldData => {
      debug('old read data', oldData);
      return {
        title: item.make,
        content: item.model,
        color: item.color,
        _id: oldData._id,
      };
    })
    .then(JSON.stringify)
    .then(json => fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json));

};
