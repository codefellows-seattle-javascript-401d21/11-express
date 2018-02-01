'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE', () => {
    this.mockNote = { title: 'hello', content: 'hello world' };

    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    describe('Valid req/res', () => {
        beforeAll(() => {
            return superagent.post(':3000/api/v1/note')
                .send(this.mockNote)
                .then(res => {
                    this.response = res;
                });
        });

        it('should respond with a status of 204', () => {
            return superagent.delete(`:3000/api/v1/note/${this.response.body._id}`)
                .then(res => expect(res.status).toBe(204));
        });
    });

    describe('Invalid req/res', () => {
        it('should return a status 404 on bad path', () => {
            return superagent.delete(':3000/api/v1/doesNotExist')
                .catch(err => {
                    expect(err.status).toBe(404);
                    expect(err.response.text).toMatch(/path error/i);
                });
        });
    });
});