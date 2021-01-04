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
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  var passedVariable = req.query.valid;
  console.log(passedVariable);
  if(typeof passedVariable === 'undefined')
  {
    res.render('login',{alertMessage:"0"});
  }
  else if(passedVariable==="User Not Found")
  {
    console.log(passedVariable);
    res.render('login',{alertMessage:"1"});
  }
  else if(passedVariable==="Username Password Mismatch")
  {
    console.log(passedVariable);
    res.render('login',{alertMessage:"2"});
  }
  
  // console.log(passedVariable);
});

app.get('/signup', (req, res) => {
  res.render('sign-up');
});

app.post('/submit-data', (req, res) => {
  console.log(req.body);
  const blog = new user(req.body);

  blog.save()
    .then(result => {
      res.redirect('/Login');
    })
    .catch(err => {
      console.log(err);
    });
});


// app.get('/home', (req, res) => {
//   res.render('home',{ email: 'Akash Adhikary'});
// });

app.post('/login', (req, res) => {
    // res.render('home', { email: req.body.email , password:req.body.password });
    console.log(req.body);
   

    
  user.findOne({ 'email': req.body.email }, 'name email Password', function (err, user) {
  if (err) {
    console.log("user not found");
    return handleError(err);
  }
  else
  { 

    if(user === null)
    {
      console.log("user not found");
      var string = encodeURIComponent('User Not Found');
      res.redirect('/login?valid=' + string);
      //res.redirect('/login');
    }
    else
    {
      console.log( user.email, user.name, user.Password,req.body.Password);

      if(user.Password==req.body.Password)
      {
        console.log("logged in");
        res.render('home', { email: user.name});
      }
      else
      {
        console.log("Cannot logg in");
        var string = encodeURIComponent('Username Password Mismatch');
        res.redirect('/login?valid=' + string);
      }
    }
  }
  
  
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
