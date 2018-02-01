'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

let testId;

describe('GET/api/v1/note', function () {
  this.mockNote = {name: 'hello', data: 'hello world'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Fetch All', () => {
    describe('Valid req/res', () => {
      beforeAll(() => {
        return superagent.get(':4000/api/v1/note')
          .send(this.mockNote)
          .then(res => this.response = res);
      });

      it('should respond with a status of 200', () => {
        expect(this.response.status).toBe(200);
        expect(this.response.body[0]);
        testId = this.response.body[0];
      });

      it('should respond with all data', () => {
        expect(this.response.body);
      });

    });

    describe('Invalid req/res', () => {
      it('should return a status 404 on bad path', () => {
        return superagent.post(':4000/api/v1/doesNotExist')
          .send(this.mockNote)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });

  describe('Fetch One', () => {
    describe('Valid req/res', () => {
      beforeAll(() => {
        return superagent.get(`:4000/api/v1/note/${testId}`)
          .send(this.mockNote)
          .then(res => this.response = res);
      });

      it('should respond with a status of 200', () => {
        expect(this.response.status).toBe(200);
      });

      it('should respond with one note', () => {
        expect(this.response.body.data).toEqual('hello world');
        expect(this.response.body.name).toEqual('hello');
      });
    });

    describe('Invalid req/res', () => {
      it('should return a status 404 on bad path', () => {
        return superagent.post(':4000/api/v1/doesNotExist')
          .send(this.mockNote)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});
