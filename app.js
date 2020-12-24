//import using require
const express = require('express');

//express app (instanciate)
const app = express();

//middleware & satic files directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// listen for requests
app.listen(3000);

// Register View Engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  res.render('home');
});

// redirects
app.get('/profile', (req, res) => {
  res.redirect('/home');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});
