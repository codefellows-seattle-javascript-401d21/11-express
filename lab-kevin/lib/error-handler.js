'use strict';

module.exports = function(err, res) {

  let errMsg = `${err.name}: ${err.message}`;
  let msg = errMsg.toLowerCase();

  switch(true) {
  case  msg.includes('validation  error'): return res.status(400).send(errMsg);
  case  msg.includes('ernoent'): return res.status(404).send(errMsg);
  default: return res.status(500).send(errMsg);
  }
  
};