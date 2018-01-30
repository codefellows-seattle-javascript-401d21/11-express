'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage-constructor');

const storage = module.exports = {};

storage.create = function(schema, item){
  let jsonItem = JSON.parse(jsonItem);
  fs.write(`${__dirname}../data/note/${schema}/${item}.json`, jsonItem)
    .then(item => item);
};

// storage.fetchOne = function (schema, item_id) {
//   return new Promise((resolve, reject) => {
//     if(!schema) return reject(new Error('Cannot get a new item; Schema and id are required'));
//     if(!item_id) return resolve(this.fetchAll(schema));
//     if(!memory[schema]) memory[schema] = {};
//     let item  = memory[schema][item_id] || null;
//     if(!item) return reject(new Error('Item does not exist get.'));
//     return resolve(item);
//   });
// };

// storage.update = function (schema, item_id, body) {
//   return new Promise((resolve, reject) => {
//     if(!schema || !item_id || !body) return reject(new Error('Cannot update item; Schema and id are required'));
//     if(!memory[schema]) memory[schema] = {};
//     let item  = memory[schema][item_id] || null;
//     if(!item) item = body;
//     let {subject, comment} = body;
//     item.subject = subject;
//     item.comment = comment;
//     memory[schema][item_id] = item;
//     return resolve(item);
//   });
// };

// storage.delete = function (schema, item_id) {
//   return new Promise((resolve, reject) => {
//     if (!schema || !item_id) return reject(new Error('Cannot get a new item; Schema and id are required'));
//     if (!memory[schema]) return resolve(item);
//     if (!memory[schema][item_id]) return reject(new Error('Item does not exist get.'));
//     delete memory[schema][item_id];
//     return resolve();
//   });
// };

// storage.fetchAll = function (schema) {
//   if (!schema) return new Error('Cannot get a new item; Schema and id are required');
//   if (!memory[schema]) return new Error('Item does not exist get.');
//   let allItems = Object.keys(memory[schema]);
//   return Object.keys(allItems[0]).length ? allItems : new Error('Item does not exist get.');
// };
