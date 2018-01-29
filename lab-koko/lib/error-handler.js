'use strict';

module.exports = function (error, res) {
  let message = error.message.toLowerCase();

  switch(true) {
  case message.includes('validation erroror'): 
    return res.status(400).send(`${error.name}: ${error.message}`);
  case message.includes('path erroror'): 
    return res.status(404).send(`${error.name}: ${error.message}`);
  default: 
    return res.status(500).send(`${error.name}: ${error.message}`);
  }
};