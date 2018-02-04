'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};


storage.fetchOne = (schema, itemId) => {
  debug('fetchOne method in storage');
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then((item) => item);
};

storage.fetchAll = (schema) => {
  debug('fetchAll method in storage');
  var filesArr = [];
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then((files) => {
      files.forEach(function(filename){
        let x = fs.readFileSync(`${__dirname}/../data/${schema}/${filename}`);
        filesArr.push(JSON.parse(x));
      });
    })
    .then(() => filesArr);
};

storage.create = (schema, item) => {
  debug('create method in storage');
  let itemJson = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, itemJson)
    .then(() => item);
};

storage.update = (schema, itemId, newData) => {
  debug('update method in storage');
  let itemJson = JSON.stringify(newData);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, itemJson);
};

storage.deleteOne = (schema, itemId) => {
  debug('deleteOne method in storage');
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

storage.deleteAll = (schema) => {
  debug('fetchAll method in storage');
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then((files) => {
      files.forEach(function(filename){
        /*let x = */fs.unlinkProm(`${__dirname}/../data/${schema}/${filename}`);
      });
    });
};
