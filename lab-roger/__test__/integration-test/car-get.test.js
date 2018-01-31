'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/car', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.get(':4000/api/v1/car/c0dd9cb5-80a2-48a0-9c78-d88576b3edca')
        .then(res => this.response = res);
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should post a new car with make, model, and color', () => {
      expect(this.response.body).toHaveProperty('model');
      expect(this.response.body).toHaveProperty('make');
      expect(this.response.body).toHaveProperty('color');
    });
    it('should respond with a make of "vw" and model of "bus"', () => {
      expect(this.response.body.make).toEqual('vw');
      expect(this.response.body.model).toEqual('bus');
    });




  });

  describe('Invalid req/res', function () {

    it('should return a status 404 on bad path', () => {
      return superagent.get(':4000/api/v1/doesNotExist')
        .send(this.mockCar)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });

    it('should return a status 404 on file not found', () => {
      return superagent.post(':4000/api/v1/car/c0dd9cb5-80a2-48a0-9c78-d88576b3edcr')
        .send(this.mockCar)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });

  });
});
