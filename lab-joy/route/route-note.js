'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = router => {
    router.post('/note', bodyParser, (req, res) => {
        let newNote;

        new Note(req.body.title, req.body.content)
            .then(note => newNote = note)
            .then(note => JSON.stringify(note))
            .then(json => storage.create('note', newNote._id, json))
            .then(() => res.status(201).json(newNote))
            .catch(err => errorHandler(err, res));
    });

    router.get('/note/:_id', (req, res) => {
        storage.fetchOne('note', req.params._id)
            .then(buffer => buffer.toString())
            .then(json => JSON.parse(json))
            .then(note => res.status(200).json(note))
            .catch(err => errorHandler(err, res));
    });

    router.get('/note', (req, res) => {
        storage.fetchAll('note')
            .then(paths => paths.map(p => p.split('.')[0]))
            .then(ids => res.status(200).json(ids))
            .catch(err => errorHandler(err, res));
    });

    router.put('/note', bodyParser, (req, res) => {
        storage.fetchOne('note', req.params._id)
            .then(buffer => buffer.toString())
            .then(json => JSON.parse(json))
            .then(note => ({
                _id: req.params._id,
                title: req.body.title || note.title,
                content: req.body.content || note.content,
            }))
            .then(note => JSON.stringify(note))
            .then(json => storage.update('note', req.params._id, json))
            .then(() => res.sendStatus(204))
            .catch(err => errorHandler(err, res));
    });

    router.delete('/note/:_id', (req, res) => {
        storage.destroy('note', req.params._id)
            .then(() => res.status(204))
            .catch(err => errorHandler(err, res));
    });
};