'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');

module.exports = function(tittle, content) {
  return new Promise( (resolve, reject) =>{
    if (!title || !content) return reject(new Error('Validation error: Cannot create note, title or content missing'));
    this.title = title;
    this.content = content;
    this._id = uuid();
    debug(`#Note: ${this}`);
    return resolve(this);
  });
};