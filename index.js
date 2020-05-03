//Instantiating express module
const express = require('express');

//Instantiating NeDB module
const Datastore = require('nedb');

//Instantiating the express server
const app = express();

//Starting server at port 3000
app.listen(3000, () => {
  console.log('Server listening at port 3000.');
});

//Telling the server to use the directory 'public' in project files
app.use(express.static('public'));

//Telling the server to not accept JSON-strings larger than 1.0MB
app.use(express.json({
  limit: '1mb'
}));

//Telling the database what file to use as a Datastore or creating it if needed
const db = new Datastore('database.db');

//Loading the database file's contents for use
db.loadDatabase();

//Receives the fetch req in index.html by querying the database
//Checking for errors and if none occur, sending the query results back
app.get('/api', (req, res) => {
  db.find({}, (err, data) => {
    if(err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

//Sends a res to the fetch in index.html and receiving its' req data
//Adding property 'timestamp' to the JSON-string and saving it in the database
//Sending a response back with the modified JSON-string
app.post('/api', (req, res) => {
  console.log('Request received!');
  req.body.timestamp = Date.now();
  db.insert(req.body);
  res.json(req.body);
});