'use strict';

const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function (router) {
//router.post() sends the info from the http request to create a new note in storage and gives a response in the terminal when that is finished
  router.post('/note', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });
  //http POST http://localhost:3000/api/v1/note title=test content="another test"
//this will create a new json file under ./data/note

  router.get('/note/:_id', (req, res) => {
    //thisfetchOne and fetchAll work similar in the sense that they retrieve from storage. The fetchAll retrieves everything in storage, fetchOne needs you to tell it which one you want to be retrieved. 
    storage.fetchOne('note', req.params._id) //this storage.fetchOne returns a promise
      .then(buffer => buffer.toString()) // here we get a buffer back
      .then(json => JSON.parse(json))//now that we got a string from the buffer, we parse it and get us a note
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  //http http://localhost:3000/api/v1/note/<grab the id from one of the posted notes and it'll show the text>
  router.get('/note', (req, res) => {
    storage.fetchAll('note')
      .then(data => data.map(id => id.split('.')[0]))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.put('/note/:_id', bodyParser, (req, res) => {
    //This one is interesting because you need to tell it which note you want to update and then once you give the ID of the one you want to modify, you can then add a new title and content.
    new Note(req.body.title, req.body.content)
      .then(note => storage.update('note', req.params._id, note))
      .then(item => res.status(204).json(item))
      .catch(err => errorHandler(err, res));
  });
  router.delete('/note/:_id', (req, res) => {
    //This one will erase the note that has the ID you inserted.
    storage.destroy('note', req.params._id)
      .then(() => res.status(204).end())
      .catch(err => errorHandler(err, res));
  //http DELETE http://localhost:3000/api/v1/note/<insert id of note to erase>

  });
};