'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};


storage.fetchOne = (schema, itemId) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
  .then(() => item)
}

storage.fetchAll = (schema) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}`)
  .then(() => items)
}

storage.create = (schema, item) => {
  // stringify? parse?
  let itemJson = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, itemJson)
  .then(() => item)
}

storage.update = (schema, itemId, newData) => {
  // is newdata is in json?
  // if newdata is json, update the file
  return fs.appendFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, newData)
/*    if(!newData.title && !newData.content) return reject(new Error('Cannot update. Title and content required'));

    // write new data in an existing file
    if(newData.title) item.title = newData.title;
    if(newData.content) item.content = newData.content;
*/
}

storage.deleteOne = (schema, itemId) => {
  // stringify? parse?
  return fs.unlinkFileProm(`${__dirname}/../data/${schema}/${item._id}.json`)
}
