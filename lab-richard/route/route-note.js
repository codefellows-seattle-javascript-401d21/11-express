'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
    router.post('/note', bodyParser, (request, response) => {
        debug('#router.post create');
        new Note(request.body.title, request.body.content)
            .then(note => storage.create('note', note))
            .then(item => response.status(201).json(item))
            .catch(err => errorHandler(err, response));
    });

    router.get('/note:_id', (request, response) => {
        debug('#router.get fetchOne');
        storage.fetchOne('note', request.params._id)
            .then(buffer => buffer.toString())
            .then(note => response.status(200).json(note))
            .catch(err => errorHandler(err, response));
    });

    router.get('/', (request, response) => {
        debug('#router.get fetchAll');
        storage.fetchAll('note')
            .then(paths => {
                console.log('paths', paths);
                return paths.map(p => p.split('.')[0]);
            })
            .then(ids => {
                console.log('ids', ids);
                response.status(200).json(ids);
            })
            .catch(err => errorHandler(err, response));
    });

    router.put('/note:_id', (request, response) => {
        debug('#router.put Update');
        new Note(request.body.title, request.body.content)
            .then(item => {
                item._id = request.body._id;
                return item;
            })
            .then(updated => storage.update('note', request.params._id, updated))
            .then(() => response.status(204).send())
            .catch(err => errorHandler(err, response));
    });

    router.delete('/note:_id', (request, response) => {
        debug('#router.delete Delete');
        storage.delete('note', request.params._id)
            .then(() => response.sendStatus(204))
            .catch(err => errorHandler(err, response));
    });
};