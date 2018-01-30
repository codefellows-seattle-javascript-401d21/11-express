'use strict';

const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    new Note(req.body.name, req.body.data)
    .then(note => storage.create('note', note))
    .then(item => res.status(201).json(item))
    .catch(err => errorHandler(err, res));
  });

  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(note => res.status(200).json(note))
    .catch(err => errorHandler(err, res));
  });

  router.get('/note/', (req, res) => {
    storage.fetchAll('note')
    .then(ids => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(ids));
      res.end();
    })
    .catch(err => errorHandler(err, res));
  })

  router.put('/note/', (req, res) => {
    console.log(req);
    if(req.url.query._id) {
      storage.update('Note', req.url.query._id, req.body)
      .then(() => {
        res.writeHead(204)
        // res.write()
        res.end()
      })
      .catch(err => errorHandler(err, res));
    }
  })

  // router.delete()
}
