'use stirct';

const Promise = require('bluebirs');
const fs = Promise.promisifyAll(require(fs), {suffix: 'Prom'});

const storage = module.exports = {};


Storage.create = function (schema, item) {
  // if() return Promise.reject();
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
  
};

Storage.fetchOne = function (schema, itemID) => 
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemID}.json`)


Storage.fetchAll = function (schema) {


};
Storage.update = function (schema, item, itemID) {


};
Storage.destroy = function (schema, itemID) {

};
