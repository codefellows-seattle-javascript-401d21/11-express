'use strict';

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

const storage = module.exports = {}

storage.create = function(schema, item) {

  let json = JSON.stringify(item) //stringify item
  return fs.writeFileProm(`${__dirname}/../data/${schema}/{item._id}.json`, json) //stringify schema memory and item id query
  .then(() => item) //TRY .then(() => item)
  .catch(err => {
    console.error('Error occured in #storage.create', err)
    return err
  })
}

storage.fetchOne = (schema, itemId) => fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)//stringify quiried data

storage.fetchAll = (schema) =>
  fs.readFileProm(`${__dirname}/../data/${schema}.json`)//stringify quiried data

storage.update = (schema, itemId, item) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)//stringify quiried data

  storage.destroy = (itemId) => fs.unlinkProm(`${__dirname}/../note/${itemId}.json`)


//testing for POST. Paste this into new window wghen nodemon is running : http POST http://localhost:3000/api/v1/note title=new-shit content=fuego
//testing for GET. http POST http://localhost:3000/api/v1/note/(PASTE IN ID NUMER HERE)
