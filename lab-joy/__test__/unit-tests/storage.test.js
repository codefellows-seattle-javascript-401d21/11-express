'use strict';

require('jest');
let Note = require('../../model/note');
let storage = require('../../lib/storage');
let superagent = require('superagent');
let server = require('../../lib/server');

describe('#Storage', () => {
    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    let note;
    new Note('titlez', 'contentz')
        .then(res => {
            note = res;
        });

    describe('#create', () => {
        it('should write a new note file to storage', () => {
            storage.create('note', note._id, JSON.stringify(note));

            return superagent.get(`:3000/api/v1/note/${note._id}`)
                .then(res => {
                    expect(res.status).toBe(200);   
                });
        });

        it('should return the correct content', () => {
            return superagent.get(`:3000/api/v1/note/${note._id}`)
                .then(res => {
                    expect(res.body).toHaveProperty('title');
                    expect(res.body).toHaveProperty('content');
                    expect(res.body).toHaveProperty('_id');
                    expect(res.body.content).toMatch(/contentz/);
                });
        });

        it('should throw an error when wrong arguments', () => {
            storage.create('cats')
                .catch(err => expect(err).not.toBeNull());
        });
    });

    describe('#fetchAll', () => {
        it('should return an array of all notes', () => {
            storage.fetchAll('note')
                .then(res => {
                    expect(Array.isArray(res)).toBeTruthy();
                });
        });

        it('should return error for incorrect path', () => {
            storage.fetchAll('cats')
                .catch(err => expect(err).not.toBeNull());
        });
    });

    describe('#fetchOne', () => {
        it('should return a specific note with an ID and the correct body and content', () => {
            storage.fetchOne('note', note._id)
                .then(buffer => buffer.toString())
                .then(json => {
                    return JSON.parse(json);
                })
                .then(note => {
                    expect(note._id).toBeTruthy();
                    expect(note.title).toBe('titlez');
                    expect(note.content).toBe('contentz');
                });
        });

        it('should return error for incorrect path', () => {
            storage.fetchOne('note', '12345')
                .catch(err => expect(err).not.toBeNull());
        });
    });

    describe('#update', () => {
        let note2;
        new Note('titlez', 'contentz')
            .then(res => {
                note2 = res;
            })
            .then(() => storage.create('note', note2._id, JSON.stringify(note2)));
        
        it('should update a note', () => {
            let updatedNote = note2;
            updatedNote.content = 'cats';
            storage.update('note', note2._id, JSON.stringify(updatedNote));

            return superagent.get(`:3000/api/v1/note/${note2._id}`)
                .then(res => {
                    expect(res.body.content).toBe('cats');
                });
        });

        it('should throw an error with incorrect arguments', () => {
            storage.update('cats')
                .catch(err => expect(err).not.toBeNull());
        });
    });

    describe('#destroy', () => {
        let note3;
        new Note('titlez', 'contentz')
            .then(res => {
                note3 = res;
            })
            .then(() => storage.create('note', note3._id, JSON.stringify(note3)));

        it('should delete a note', () => {
            storage.destroy('note', note3._id);

            return superagent.get(`:3000/api/v1/note/${note3._id}`)
                .catch(err => expect(err).not.toBeNull());
        });

        it('should return an error with incorrect path', () => {
            storage.destroy('note', note3._id)
                .catch(err => expect(err).not.toBeNull());
        });
    });
});