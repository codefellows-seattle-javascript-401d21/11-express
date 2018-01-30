'use strict';

const uuid = require('uuid/v4');

module.exports = function Note(title, content) {
  return new Promise((resolve, reject) => {
    // Validation
    if(!title) return reject(new Error('Validation Error: Cannot create Note. `title` required.'));
    if (!content) return reject(new Error('Validation Error: Cannot create Note. `content` required.'));

    // Make the Note
    this._id = uuid();
    this.title = title;
    this.content = content;

    return resolve(this);
  });
};
