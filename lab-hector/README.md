# Express lab 11

In order to use this app:
  - Fork this repo
  - Clone it into local machine
  - Go into lab-hector 
  - run ```npm install``` for dependencies.


Once everything is installed, open 2 terminal windows. If using iTerm2, hit command + D and that will split in two independent windows, one for the server and one for the CRUD commands.

run ```nodemon``` in one of the windows.

Use the other window to use the following commands: 

To POST a new note:

- ```http POST http://localhost:3000/api/v1/note title=test content="another test"```
    - This will create a new JSON file under ./data/note

To UPDATE a note:

- ```http PUT http://localhost:3000/api/v1/note/<insert id> title="updating" content="new updated stuff"```
    - This will update the title and content of the note you want to modify

To GET all notes:

- ```http GET http://localhost:3000/api/v1/note```
    - This will retrieve all the notes stored in data/notes file

To GET one of the notes:
- ```http GET http://localhost:3000/api/v1/note/<plus add the id of one of the notes>```
    -This will retrieve the note which ID you inserted

To DELETE one of the notes:

- ```http DELETE http://localhost:3000/api/v1/note/<insert id of note to erase>```
    - This command will erase the note that has the ID you inserted.

