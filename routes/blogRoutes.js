const express = require('express');
const router = express.Router();
const user = require('../models/user');
var session = require('express-session');

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
var sess;

//routes
  router.get('/', (req, res) => {
    res.redirect('/login');
  });

  router.get('/home', (req, res) => {
    //sess = req.session;
    if(sess)
    {
      console.log(sess.name);
      res.render('home',{name: sess.name});
    }
    else
    {
      res.redirect('/login');
    }
    
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
                sess = req.session;
                console.log(user.name);
                sess.name=user.name;
                console.log(sess.name);
                console.log("logged in");
                res.redirect('/home');
                // app.set('trust proxy', 1) // trust first proxy
                // sess.name=user.name;
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

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
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

