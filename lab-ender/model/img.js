'use strict';

const uuid = require('uuid/v4');

const Note = module.exports = function(title, url) {
  return new Promise((resolve, reject) => {
    if (!title || !url) {
      return reject(new Error('Validation Error. Cannot create note. Title and URL are required.'));
    }
    this._id = uuid();
    this.title = title;
    this.url = url;

    return resolve(this);
  });
};
