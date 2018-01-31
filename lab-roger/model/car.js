'use strict';
const uuid = require('uuid/v4');
const debug = require('debug')('http:car.js');

module.exports = function(make, model, color) {

  return new Promise((resolve, reject) => {
    if(!make || !model || !color) return reject(new Error('Validation Error, Cannot create car, Make, model and color required'));
    this._id = uuid();
    this.make = make;
    this.model = model;
    this.color = color;
    debug('new Car', this);
    return resolve (this);
  });

};
