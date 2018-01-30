// 'use strict';

// if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// const server = require('./lib/server');
// server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

// 'use strict';

// require('dotenv').config();

const server = require('./lib/server');


server.start(3000, () => console.log(`Listening on 3000`));
// server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

//brew install httpie
//npm i bluebird, express, jest, body-parser, uuid, file-system, eslint
//launch nodemon

//npm i -D dotenv