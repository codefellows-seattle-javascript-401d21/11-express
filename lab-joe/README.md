Joseph Waine - LAB 10 - Express.js

packages used:

jest, bluebird, uuid, express, nodemon

USAGE:

In order to test this api, run nodemon in your terminal when at the file directory of your project.

open postman and test, get, put, delete, and post methods.

if your host was 3000:


for POST
http://localhost:3000/api/v1/note
with a json body of {"title": "hello", "content":"content of content"}

for GET
http://localhost:3000/api/v1/note/***id__here***

for GET (to fetch all)
http://localhost:3000/api/v1/note/


for PUT
http://localhost:3000/api/v1/note/***id__here***
with a json body of {"title": "HERE IS AN UPDATED TITLE", "content":"HERE IS SOME UPDATED CONTENT"}

for DELETE
http://localhost:3000/api/v1/note/***id__here***


Feature Tasks

create an HTTP server using express
create a object constructor that creates a simple resource with at least 3 properties
it can not have the same properties as the in-class sample code (other than the id)
a unique _id property should be included (uuid)
include two additional properties of your choice
use the JSON parser included with the body-parser module as a middleware component to parse the request body on POST and PUT routes
use the npm debug module to log the methods in your application
create any npm scripts to automate the development process
persist your API data using the storage module and file system persistence
Server Endpoints
/api/v1/simple-resource-name
POST request
pass data as stringifed JSON in the body of a POST request to create a new resource
GET request
pass /:_id as a parameter to retrieve a specific resource (as JSON)
PUT request
pass /:_id as a parameter with a body of data to UPDATE a pre-existing resource
DELETE request
pass /:_id as a parameter to DELETE a specific resource
this should return a 204 status code with no content in the body