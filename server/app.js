const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express();

const db = require("../models").db;

app.use(express.static(path.join(__dirname, '..', 'public')))


// logging and body-parsing
app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error();
  res.send("go to hell");
});


// listen on a port
var port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});