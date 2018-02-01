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
        .then(res => note = res);

        
    it('should write a new note file to storage', () => {
        storage.create('note', note._id);

        return superagent.get(`:3000/api/v1/note/${note._id}`)
            .then(res => {
                console.log('res: ', res);
            });

    });
});