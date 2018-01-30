'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');


module.exports = function(router) {
  debug('routes');
  debug('routes2');
  
  
  router.post('/note', bodyParser, (req, res) => {
    debug('route post');
    new Note(req.body.subject, req.body.comment)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch( err => errorHandler(err, res));
  });

  router.get('/note/:id', bodyParser, (req, res) =>{
    debug('route fetchone');
    let note_id = req.params.id;
    storage.fetchOne('note', note_id)
      .then(data => res.status(200).json(JSON.parse(data)))
      .catch( err => errorHandler(err, res));
  });

  router.get('/note', bodyParser, (req, res) =>{
    debug('route fetchall');
    storage.fetchAll('note')
      .then(data => res.status(200).json(data))
      .catch( err => errorHandler(err, res));
  });

  // router.get('/api/v1/note', (req, res) => {
  //   let note_id = req.url.query.id;
  //   storage.fetchOne('note', note_id)
  //     .then(storageNote => {
  //       let resStatus = 200;
  //       let resMesg = JSON.stringify(storageNote);
  //       let contentType = 'application/json';
  //       if (!Object.keys(storageNote).length) [resStatus, contentType, resMesg] = [400, 'text/plain', 'Bad Request'];
  //       res.writeHead(resStatus, {'content-Type': contentType});
  //       res.write(resMesg);
  //       res.end();
  //     })
  //     .catch(err =>{
  //       debug(`fetchOne error: ${err}`);
  //       res.writeHead(400, {'Content-Type': 'text/plain'});
  //       res.write('Bad Request');
  //       res.end();
  //     });
  // });

  // router.put('/api/v1/note', (req, res) => {
   
  //   let [note_id , noteBody ] = [req.url.query.id, req.body];
  //   noteBody.id = note_id;
  //   storage.update('note', note_id, noteBody)
  //     .then(() => {
  //       res.writeHead(204, {'content-Type': 'text/plain'});
  //       res.write();
  //       res.end();
  //     })
  //     .catch(err =>{
  //       debug(`fetchOne error: ${err}`);
  //       res.writeHead(400, {'Content-Type': 'text/plain'});
  //       res.write('Bad Request');
  //       res.end();
  //     });
  // });

  // router.delete('/api/v1/note', (req, res) => {
  //   let note_id = req.url.query.id;
  //   storage.delete('note', note_id)
  //     .then(() => {
  //       res.writeHead(204, {'content-Type': 'text/plain'});
  //       res.end();
  //     })
  //     .catch(err =>{
  //       debug(`fetchOne error: ${err}`);
  //       res.writeHead(400, {'Content-Type': 'text/plain'});
  //       res.write('Bad Request');
  //       res.end();
  //     });
  // });

};