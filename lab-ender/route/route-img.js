'use strict';

const Img = require('../model/img');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-img');

module.exports = function(router) {
  router.post('/img', bodyParser, (req, res) => {
    debug(`router.post /img/ called: req: ${JSON.stringify(req.body)}`);
    let newImg;

    new Img(req.body.title, req.body.url)
    .then(img => newImg = img)
    .then(img => JSON.stringify(img))
    .then(json => storage.create('img', newImg._id, json))
    .then(() => res.status(201).json(newImg))
    .catch(err => errorHandler(err, res));
  });
  router.get('/img/:_id', (req, res) => {
    debug(`router.get /img/${req.params._id} called: req: ${JSON.stringify(req.body)}`);
    storage.fetchOne('img', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(img => res.status(200).json(img))
    .catch(err => errorHandler(err, res));
  });
  router.get('/img/', (req, res) => {
    debug(`router.get /img/ called: req: ${JSON.stringify(req.body)}`);
    storage.fetchAll('img')
    .then(paths => paths.map(p => p.split('.')[0]))
    .then(ids => res.status(200).json(ids))
    .catch(err => errorHandler(err, res));
  });
  router.put('/img/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(note => ({
      _id: req.params._id,
      title: req.body.title || note.title,
      url: req.body.url || note.url
    }))
    .then(note => JSON.stringify(note))
    .then(json => storage.update('note', req.params._id))
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res));
  });
  router.delete('/img/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res));
  });
};
