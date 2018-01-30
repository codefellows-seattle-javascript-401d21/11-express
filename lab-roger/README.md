# Project Title

Basic Express Server



### Installing

To be able to use this at the user will need to install some depencencies, to do this type the following in the command line  
Say what the step will be

```
npm install
```
To start the server   
```
npm run start
```

This is a http server, so the following commands will allow you to post a new car, delete, get, or uodate.

```
http http://localhost:3000/api/v1/car
```
Will return a list of all of the current cars.
```
http http://localhost:3000/api/v1/car/<record number>  
```
Will return that specific record
```
http POST http://localhost:3000/api/v1/car make=<make> model=<model> color=<color>  
```
Will create a new record.
```
http DELETE http http://localhost:3000/api/v1/car/<record number>
```
Will delete that record.
```
http PUT http http://localhost:3000/api/v1/car/<record number> color=<new color> model=<new model> make=<new make>
```
Will amend a record.



## Running the tests

There are no test at this time.



## Authors

* **Roger Davenport** - RND -

## License

This project is licensed under the MIT License
