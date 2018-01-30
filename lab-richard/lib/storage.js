'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = module.exports = {};

storage.create = function(schema, item) {
    debug('#storage.create Create');
    let json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
        .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
    debug('#storage.fetchOne Just one');
    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

storage.fetchAll = (schema) => {
    debug('#storage.fetchAll ALL');
    return fs.readFileProm(`${__dirname}/../data/${schema}.json`)
        .then(dir => dir.map(file => file.split('.')[0]));
};

storage.update = (schema, itemId, item) => {
    debug('#storage.update Update');
    if(item._id !== itemId) return Promise.reject(new Error('Validation Error: Cannot update file with unmatched ID'));
    let json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json)
        .then(() => item);
};

storage.delete = (schema, itemId) => {
    debug('#storage.delete Seek and Destroy');
    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};






