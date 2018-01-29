'use strict'

const debug = require('debug')('http:storage')

const storage = module.exports = {}
const memory = {};


// memory = {
//   'Notes': {
//     '1234.5678.9012': {
//       '_id': '1234.5678.9012',
//       'title': '',
//       'content': '',
//     },
//   },
//   'Categories': {
//     ...
//   },
// }

storage.create = function(schema, item) {
  debug('Created a new thing')

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'))

    if(!memory[schema]) memory[schema] = {}

    memory[schema][item._id] = item
    // debug(`right before return${memory[schema][item._id]}`)
    console.log(`${memory}`)
    return resolve(memory[schema][item._id])
  })
}

storage.fetchOne = function(schema, id) {
    return new Promise((resolve, reject) => {
        // if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'))
        return resolve(memory[schema][id])
      })
}

storage.fetchAll = function(schema) {
    return new Promise((resolve, reject) => {
      let memId = Object.keys(memory[schema])
        return resolve(memId)
      })
}

storage.update = function(schema, item) {
    return new Promise((resolve, reject) => {
        if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'))
    
        if(!memory[schema]) memory[schema] = {}
    
        memory[schema][item._id] = item
        // debug(`right before return${memory[schema][item._id]}`)
        console.log(`${memory}`)
        return resolve(memory[schema][item._id])
      })
}

storage.delete = function(schema, id) {
    return new Promise((resolve, reject) => {
        // if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'))
        delete memory[schema][id];
        // debug(`right before return${memory[schema][item._id]}`)

        return resolve(memory)
      })


}