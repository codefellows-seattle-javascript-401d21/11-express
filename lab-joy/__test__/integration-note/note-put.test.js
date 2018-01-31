'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT', () => {
    this.mockNote = { title: 'hello', content: 'hello world' };
    this.mockNoteUpdated = { title: 'hello', content: 'cats' };

    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    describe('Valid req/res', () => {
        beforeAll(() => {
            return superagent.post(':3000/api/v1/note')
                .send(this.mockNote)
                .then(res => this.response = res);
        });

        it('should respond with a status of 204', () => {
            return superagent.put(`:3000/api/v1/note/${this.response.body._id}`)
                .send(this.mockNoteUpdated)
                .then(res => expect(res.status).toBe(204));        
        });

        it('should update the note', () => {
            return superagent.get(`:3000/api/v1/note/${this.response.body._id}`)
                .then(res => expect(res.body.content).toMatch(/cats/));
        });
    });

    describe('Invalid req/res', () => {
        it('should return a status 404 on bad path', () => {
            return superagent.put(':3000/api/v1/doesNotExist')
                .send(this.mockNote)
                .catch(err => {
                    expect(err.status).toBe(404);
                    expect(err.response.text).toMatch(/path error/i);
                });
        });

        it('should return a status 400 on bad request body', () => {
            return superagent.put(`:3000/api/v1/note/${this.response.body._id}`)
                .send({})
                .catch(err => expect(err.status).toBe(400));
        });
    });
});