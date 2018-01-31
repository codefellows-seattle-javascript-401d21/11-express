const Car = require('../model/car');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-car');

module.exports = function(router) {

  router.post('/car', bodyParser, (req, res) => {
    debug('inside route-car post router');
    console.log('inside post');
    new Car(req.body.make, req.body.model, req.body.color)
      .then(car => storage.create('car', car))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.get('/car/:_id', (req, res) => {
    storage.fetchOne('car', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(car => res.status(200).json(car))
      .catch(err => errorHandler(err, res));
  });

  router.get('/car', (req, res) => {
    storage.fetchAll('car')
      .then(array => array.map(id => id.split('.')[0]))
      .then(cars => res.status(200).json(cars))
      .catch(err => errorHandler(err, res));
  });

  router.put('/car/:_id', bodyParser, (req, res) => {
    storage.fetchOne('car', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(car => ({
        _id: req.params._id,
        model: req.body.model || car.model,
        make: req.body.make || car.make,
        color: req.body.color || car.color,
      }))
      .then(note => JSON.stringify(note))
      // .then(note => console.log('note', note))
      .then(json => storage.update('car', req.params._id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));

  });




  router.delete('/car/:_id', (req, res) => {
    debug('inside delete');
    storage.destroy('car', req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });

};
