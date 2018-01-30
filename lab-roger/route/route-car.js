const Car = require('../model/car');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {

  router.post('/car', bodyParser, (rep, res) => {
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

  router.get('/car/*', (req, res) => {
    storage.fetchAll('car')
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(cars => res.status(200).json(cars))
      .catch(err => errorHandler(err, res));
  });
  // router.put()
  // router.delete()

};
