'use strict';

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

const storage = module.exports = {}

storage.create = function(schema, item) {
  if (!schema) return new Error('Validation error. Cannot create record. Schema required.') //if no schema, return error message
  if (!item) return new Error('Validation error. Cannot create record. Item required.') //if no item, return error message

  let json = JSON.stringify(item) //stringify item
  return fs.writeFileProm(`${__dirname}/../data${schema}/{item._id}.json`, json) //stringify schema memory and item id query
  .then(() => json) //TRY .then(() => item)
  .catch(err => {
    console.error('Error occured in #storage.create', err)
    return err
  })
}

storage.fetchOne = function(schema, itemId) { //error first format before reading and stringifying  schema and itemId
  if(!schema) return new Error('Validation error. Cannot get record. Schema required')
  if(!itemId) return new Error('Validation Error. Cannot get record. Item ID required.')
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)//stringify quiried data
}

storage.fetchAll = function(schema) {
  if(!schema) return new Error('Validation Error. Cannot get reocrods. Schema required.')
}

storage.update = function(schema, itemId, item) {
  if(!schema) return new Eror('Validation Error. Cannot update record. Schema required')
  if(!itemId) return new Error('Validation Error. Cannot upodate record. ItemId required')
  if(!item) return new Error('Validation Error. Cannot update record. Item required')
}