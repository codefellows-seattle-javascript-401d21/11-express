'use strict';

//require in all files within library
const Note = require('../model/note.js')
const storage = require('../lib/storage.js')
const bodyParser = require('body-parser').json() //stringifiy
const errorHandler = require('../lib/error-handler.js')

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => { //creating pathway
    new Note(req.body.title, req.body.content) //this is where reuquireing bodyparser comes to play
    .then(note => storage.create('note', note))
    .then(item => res.status(201).json(item))
    .catch(err => errorHandler(err, res)) //thjis is where requiring error handler file kicks in
  })
  router.get('/note/:_id', (req, res) => { //creating pathway
    storage.fetchOne('note', req.params._id) //request paramaters by Id i think
    .then(buffer => buffer.toString()) //stringify the data
    .then(json => JSON.parse(json)) //parse it
    .then(note => res.status(200).json(note)) //stringify note
    .catch(err => errorHandler(err, res)) //error handler
  })
  //router.get()
  //router.put()
  //router.delete()
}