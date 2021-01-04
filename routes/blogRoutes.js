const express = require('express');
const router = express.Router();
const user = require('../models/user');

//routes
router.get('/', (req, res) => {
    res.redirect('/login');
  });
  
  router.get('/login', (req, res) => {
    var passedVariable = req.query.valid;
  
    if(typeof passedVariable === 'undefined')
    {
      res.render('login',{alertMessage:"0"});
    }
    else if(passedVariable==="User Not Found")
    {
      res.render('login',{alertMessage:"1"});
    }
    else if(passedVariable==="Username Password Mismatch")
    {
      res.render('login',{alertMessage:"2"});
    }
  });
  
  router.get('/signup', (req, res) => {
    res.render('sign-up');
  });
  
  router.post('/submit-data', (req, res) => {
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
  
  
  router.post('/login', (req, res) => {
    user.findOne({ 'email': req.body.email }, 'name email Password', function (err, user) 
    {
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
  router.get('/profile', (req, res) => {
    res.redirect('/home');
  });
  
  // 404 page
  router.use((req, res) => {
    res.status(404).render('404');
  });

  module.exports = router;

