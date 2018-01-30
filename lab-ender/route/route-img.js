'use strict';

const Img = require('../model/img');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/img', bodyParser, (req, res) => {
    new Img(req.body.title, req.body.url)
    .then(img => storage.create('img', img))
    .then(item => res.status(201).json(item))
    .catch(err => errorHandler(err, res));
  });
  router.get('/img/:_id', (req, res) => {
    storage.fetchOne('img', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(img => res.status(200).json(img))
  });
  router.put('/img/:_id', (req, res) => {

  });
  router.delete('/img/:_id', (req, res) => {

  });
};
