'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = module.exports = {};

storage.create = (schema, item) => {
    let json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
        .then(() => item);
};

storage.fetchOne = (schema, itemId) => fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

storage.fetchAll = schema => {
    let files = [];
    fs.readdir(`${__dirname}/../data/${schema}/`, (err, fileNames) => {
        if (err) console.error(err);
        fileNames.forEach(file => {
            fs.readFileProm(`${__dirname}/../data/${schema}/${file}`)
                .then(file => files.push(file));
        });
    })
        .then(() => files);
};

storage.update = (schema, itemId, item) => {
    let json = JSON.stringify(item);
    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json)
        .then(() => fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json));
};

storage.destroy = (schema, itemId) => {
    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};