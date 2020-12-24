//import using require
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/user');


const dbURI = "mongodb+srv://netninja:TeroTero@netninja.krkpa.mongodb.net/node-tuts?retryWrites=true&w=majority";

//express app (instanciate)
const app = express();
//satic files directory
app.use(express.static('public'));

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  res.sendFile('./views/login.html', { root: __dirname });
});

app.get('/home', (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile('./views/home.html', { root: __dirname });
});

// redirects
app.get('/profile', (req, res) => {
  res.redirect('/home');
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
