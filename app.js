//import using require
const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/user');

const dbURI = "mongodb+srv://netninja:TeroTero@netninja.krkpa.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


//express app (instanciate)
const app = express();
//satic files directory
app.use(express.static('public'));

// listen for requests
//app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// register view engine
app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => {
  res.render('login');
});

// app.get('/home', (req, res) => {
//   res.render('home',{ email: 'Akash Adhikary'});
// });

app.post('/home', (req, res) => {
    res.render('home', { email: req.body.email , password:req.body.password });
    console.log(req.body);
    //
    // user.find({ email: 'akash.adhikary@hotmail.com'}, function (err, docs) { 
    //   if (err){ 
    //       console.log(err); 
    //   } 
    //   else{ 
    //       console.log("First function call : ", docs); 
    //   } 
    // }); 
    // 

    user.find({ email: req.body.email})
    .then(result => {
      // res.render('details', { blog: result, title: 'Blog Details' });
      console.log(2);
    })
    .catch(err => {
      console.log(err);
    });


  });

// redirects
app.get('/profile', (req, res) => {
  res.redirect('/home');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});
