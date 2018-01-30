'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    debug('Router POST');
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.get('/note/:_id', (req, res) => {
    debug('Router GET one');
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });

  router.get('/note', (req, res) => {
    debug('Router GET all');
    storage.fetchAll('note')
      .then(ids => res.status(200).json(ids))
      .catch(err => errorHandler(err, res));
  });

  router.put('/note/:_id', bodyParser, (req, res) => {
    debug('Router PUT');
    new Note(req.body.title, req.body.content)
      .then(note => storage.update('note', req.params._id, note))
      .then(item => res.status(204).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.delete('/note/:_id', (req, res) => {
    debug('Router Delete');
    storage.destroy('note', req.params._id)
      .then(note => res.status(204).json(note))
      .catch(err => errorHandler(err, res));
  });
};
