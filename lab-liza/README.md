# Lab 11 - Express

**Author**: Liza Oh

## Overview
This app is single resource API using the express framework.

## Getting Started
The user must:
-Npm init their project
-Download dependencies
-Brew Install HTTPIE/Use Postman

## Examples:
**POST example:**
```
http POST http://localhost:3000/api/v1/note name=liza data=hello
```

**GET example:**
```
http GET http://localhost:3000/api/v1/note
```

**PUT example:**
```
http PUT http://localhost:3000/api/v1/note/be834b7b-4d6e-4d03-ba72-9dcdcd2cef2d name=updatedname data=updateddata
```

**DELETE example:**
```
http DELETE http://localhost:3000/api/v1/note/be834b7b-4d6e-4d03-ba72-9dcdcd2cef2d
```

## Architecture
Javascript
Node
Jest