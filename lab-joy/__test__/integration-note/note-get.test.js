'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET', () => {
    this.mockNote = { title: 'hello', content: 'hello world' };
    let mockNoteId;

    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));

    beforeAll(() => {
        return superagent.post(':3000/api/v1/note')
            .send(this.mockNote)
            .then(res => {
                this.response = res;
                mockNoteId = this.response.body._id;
            });
    });

    afterAll(() => server.stop());

    describe('Fetch All: Valid req/res', () => {
        beforeAll(() => {
            return superagent.get(':3000/api/v1/note')
                .then(res => this.response = res);
        });

        it('should respond with a status of 200', () => {
            expect(this.response.status).toBe(200);
        });

        it('should respond with an array of note IDs', () => {
            expect(typeof this.response.body).toBe('object');
            expect(Array.isArray(this.response.body)).toBeTruthy();
        });
    });

    describe('Fetch One: Valid req/res', () => {
        beforeAll(() => {
            return superagent.get(`:3000/api/v1/note/${mockNoteId}`)
                .then(res => {
                    this.responseOne = res;
                });
        });

        it('should respond with a status of 200', () => {
            expect(this.responseOne.status).toBe(200);
        });

        it('should get a new note with title, content, and _id', () => {
            expect(this.responseOne.body).toHaveProperty('title');
            expect(this.responseOne.body).toHaveProperty('content');
            expect(this.responseOne.body).toHaveProperty('_id');
            expect(this.responseOne.body.content).toMatch(/hello world/);
        });
    });

    describe('Invalid req/res', () => {
        it('should return a status 404 on bad path', () => {
            return superagent.get(':3000/api/v1/doesNotExist')
                .catch(err => {
                    expect(err.status).toBe(404);
                    expect(err.response.text).toMatch(/path error/i);
                });
        });
    });
});