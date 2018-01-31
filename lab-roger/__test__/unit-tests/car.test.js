'use strict';

const Car = require('../../model/car');

require ('jest');


describe('Unit test for car.js', function() {

  it('should take 3 arguments', () => {
    expect(new Car('test','test','test')).toBeInstanceOf(Promise);

  });




});
