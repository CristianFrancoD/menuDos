const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
app.set('view engine', 'pug')

/**
 * Database stuff
 */
//Makes the conecction whith the database (Mongo Atlas) the MONGO_URI value is in .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//Check connection
db.once('open',function(){
    console.log('Connected to MongoDB')
})

//Check for DB erros
db.on('error',function(err){
    console.log(err);
})


/**
 * Middleware
 */
//Logger for al requests
app.use(function(req,res,next){
  req.time = new Date().toString();
  console.log(req.time+": "+req.method+" "+req.path+" - "+req.ip)
  next();
  
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//use stactic assets for every file
app.use(express.static(__dirname +'/public'));
  

/**
 * Routes
*/

app.get('/',function(req,res){
  res.render(__dirname+'/views/pug/index');
});

// Menus Routes
const menu = require('./routes/menu');
app.use('/menu',menu);


const auth = require('./routes/auth');
app.use('/auth',auth);


app.listen(3000, function () {
  console.log('Running app listening on port 3000!');
});