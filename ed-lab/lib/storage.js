'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

const storage = module.exports = {}

storage.create = (schema, item) => {
  let json = JSON.stringify(item)
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item)
}

storage.fetchOne = (schema, itemId) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)


storage.update = (schema, itemId, item) => {
  let json = JSON.stringify(item)
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item)

}

storage.destroy = (schema, itemId) => {
}
