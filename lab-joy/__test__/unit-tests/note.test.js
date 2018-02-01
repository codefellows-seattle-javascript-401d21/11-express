'use strict';

require('jest');
let Note = require('../../model/note');

describe('#Note', () => {
    let note;
    new Note('titlez', 'contentz')
        .then(res => note = res);

    it('should create an instance of a Note', () => {
        expect(note instanceof Note).toBeTruthy();
    });

    it('should have the correct title and content and an ID', () => {
        expect(note.title).toBe('titlez');
        expect(note.content).toBe('contentz');
        expect(note._id).toBeTruthy();
    });

    it('should throw an error without a title or content', () => {
        new Note('titlez2')
            .then()
            .catch(err => expect(err).not.toBeNull());
    });
});