'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');


module.exports = function(title, content){

  return new Promise((resolve, content) => {

    if(!title || !content){
      return reject(new Error('Validation Error. Title and content required.'));
    }

  this._id = uuid();
  this.title = title;
  this.content = content;

  return resolve(this);

  debug(`Created a note: Title: ${this.title}, Content: ${this.content}, ID: ${this._id}`);
  });
}
