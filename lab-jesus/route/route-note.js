'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage')
const debug = require('debug')('http:route-note')
const fs = require('fs')

module.exports = function(router) {
    router.post('/api/v1/note', (req,res) => {
        debug('POST /api/v1/note')

        try{
            debugger;
            let newNote = new Note(req.body.title, req.body.content)

            storage.create('Note', newNote)
            .then(storedNote => {
                res.writeHead(201, {'Content-Type': 'application/json'})
                res.write(JSON.stringify(storedNote))
                res.end()
            })
        } catch(err) {
            debug(`There was a bad request: ${err}`)

            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.write('Bad Request')
            res.end()
        }
    })

    router.get('/api/v1/note', (req, res)=> {
        debug(`GET /api/v1/note: ${req}`)

        if(req.url.query._id) {
            storage.fetchOne('Note', req.url.query._id)
            .then(note => {
              res.writeHead(200, {'Content-Type': 'application/json'})
              res.write(JSON.stringify(note))
              res.end()
            })
            .catch(err => {
              if(err.message.startsWith('400')) {
                res.writeHead(400, {'Content-Type': 'text/plain'})
                res.write('Bad Request')
                res.end()
                return
              }
      
              res.writeHead(404, {'Content-Type': 'text/plain'})
              res.write('Not Found')
              res.end()
            })
            return
          }


        try{
            
            storage.fetchAll('Note')
            .then(storedNote => {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.write(JSON.stringify(storedNote))
                res.end()
            })
        } catch(err) {
            debug(`There was a bad request: ${err}`)

            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.write('Bad Request')
            res.end()
        }

    })

    router.put('/api/v1/note', (req, res)=> {
        try{
            let newNote = new Note(req.body.title, req.body.content)
            console.log(req.body.id)
            newNote._id = req.body.id

            storage.update('Note', newNote)
            .then(storedNote => {
                res.writeHead(204, {'Content-Type': 'application/json'})
                res.write(JSON.stringify(storedNote))
                res.end()
            })
        } catch(err) {
            debug(`There was a bad request: ${err}`)

            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.write('Bad Request')
            res.end()
        }
        
    })

    router.delete('/api/v1/note', (req, res) => {
        try {
          storage.delete('Note', req.body.id)
          res.writeHead(204, {'Content-Type': 'application/json'})
          res.end()
            
        } catch(err) {
          debug(`Bad request: ${err}`)
          res.writeHead(400, {'Content-Type': 'text/plain'})
          res.write('Bad Request delete')
          res.end()
        }
    
      }) 
}