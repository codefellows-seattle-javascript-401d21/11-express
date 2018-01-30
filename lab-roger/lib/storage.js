'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = (schema, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/..data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

storage.fetchAll = (schema) => {
  fs.readdirProm(`${__dirname}/../data/${schema}/*.json`)
    .then(array => console.log('arry from readdir', array));
};
// storage.update = (schema, itemId, item) => {
// };

storage.destroy = (schema, itemId) => {
  fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(res => console.log('file deleted', res));

};
