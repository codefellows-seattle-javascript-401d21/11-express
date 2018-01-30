# Lab 11 - Express

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview

## Getting Started
The user needs to do the following to use this Express REST API
-Clone the repository from github [here](https://github.com/stevegcarpenter/11-express)
-Install all the necessary `npm` packages by executing `npm install`
-To run the `linter` check execute `npm run lint`
-In order to test all the four HTTP methods (POST, GET, PUT, DELETE), start the nodemon server by executing `nodemon`
-Following this, use a program like [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/) to test calls

## HTTP Method Directions
Currently `quote` is the only data category supported using this REST Express API. It contains the following necessary data:
-`quote`: The quote itself
-`author`: The quote's author

The following HTTP routes are supported:
-POST: `/note` with the `quote` and `author` data fields provided in the body
-GET: Both `/note` to fetch all quotes and `/note/:_id` to get a single quote
-PUT: `/quote:_id` with updated `quote` and `author` fields in the body
-DELETE: `/quote/:_id`

## Architecture
-NodeJS
-Express
-npm
-JS

## Change Log
2018-01-29 Adding dotfiles to the repo
2018-01-29 Adding npm package files
2018-01-29 Adding all code written in lecture
2018-01-29 Adding Promisified fs.readdir call to read the Note filenames
2018-01-29 Added '/note' GET HTTP method for all notes
2018-01-29 Added the put route and corresponding storage update function.
2018-01-29 Adding DELETE HTTP method
2018-01-29 Removed unused itemId variable
2018-01-29 Changed notes to quotes

## Credits and Collaborations
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[JavaScript](https://www.javascript.com/)
[Express](https://expressjs.com/)
