'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/note', function() {
  this.mockImg = {
    title: 'flower',
    url: 'https://goo.gl/images/jSTnB0'
  }

  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/img')
      .send(this.mockImg)
      .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new img with title, url, and _id', () => {
      expect(this.response.body).toHaveProperty('title');
      expect(this.response.body).toHaveProperty('url');
      expect(this.response.body).toHaveProperty('_id');
    });
    it('should respond with a title of "flower" and url of "https://goo.gl/images/jSTnB0"', () => {
      expect(this.reponse.body.title).toEqual(this.mockImg.title);
      expect(this.reponse.body.url).toEqual(this.mockImg.url);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on a bad path', () => {
      return superagent.post(':4000/api/v1/noooope')
      .send(this.mockImg)
      .catch(err => {
        expect(err.status).toBe(404);
        expect(err.response.text).toMatch(/path error/i);
      });
    });
  });

});
