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



storage.update = (itemId, body) => {
    let updateItem = {"_id": itemId, "title": body.title, "content": body.content}
    let json = JSON.stringify(updateItem)
    return fs.writeFileProm(`${__dirname}/../data/note/${itemId}.json`, json)
    .then(() => item)
        }

storage.fetchAll = (schema) => {
    return fs.readdirProm(`${__dirname}/../data/${schema}`)
}



storage.destroy = (itemId) => {
    return fs.unlinkProm(`${__dirname}/../data/note/${itemId}.json`)
}