'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/car', function () {
  this.mockCar = {make: 'honda', model: 'pilot', color:'black'};
  let idDelete;

  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/car')
        .send({make: 'honda', model: 'pilot', color:'black'})
        .then(res => idDelete = res.body._id);
    });




    it('should return a status of 201', () => {
      return superagent.delete(`:4000/api/v1/car/${idDelete}`)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });


  });

  describe('Invalid req/res', function () {

    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });

    it('should return a status 404 on file not found', () => {
      return superagent.get(`:4000/api/v1/car/${idDelete}`)
        .catch(err => {
          expect(err.status).toBe(404);

        });
    });

  });
});
