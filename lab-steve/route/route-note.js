'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  // Create a note
  router.post('/note', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(note => res.status(201).json(note))
      .catch(err => errorHandler(err, res));
  });

  // Get a single note by uuid
  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });

  // Get all the notes
  router.get('/note', (req, res) => {
    storage.fetchAll('note')
      .then(buffer => buffer.toString())
      .then(str => str.split(','))
      .then(arr => arr.map(e => e.split('.')[0]))
      .then(notes => res.status(200).json(notes))
      .catch(err => errorHandler(err, res));
  });

  // Update a note
  router.put('/note/:_id', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => {
        note._id = req.params._id;
        return note;
      })
      .then(note => storage.update('note', note._id, note))
      .then(note => res.status(204).send(note))
      .catch(err => errorHandler(err, res));
  });

  // Delete a note
  // router.delete();
};
