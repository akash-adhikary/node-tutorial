//import using require
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const dbURI = "mongodb+srv://netninja:TeroTero@netninja.krkpa.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
//express app (instanciate)
const app = express();
app.set('trust proxy', 1) // trust first proxy
//satic files directory
app.use(express.static('public'));
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// register view engine
app.set('view engine', 'ejs');
app.use(blogRoutes);
