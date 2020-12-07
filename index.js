var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

var mongoose = require('mongoose');

//makes the conecction whith the database (Mongo Atlas) the MONGO_URI value is in .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });




//use stactic assets for every file
app.use(express.static(__dirname +'/public'));

//logger for al requests
app.use(function(req,res,next){
  req.time = new Date().toString();
  console.log(req.time+": "+req.method+" "+req.path+" - "+req.ip)
  next();
  
  });

app.use(bodyParser.urlencoded({extended: false}));

  


app.get('/menu',function(req,res){
   
  res.sendFile(__dirname+'/views//menu.html');
});

app.get('/createMenu',function(req,res){
  res.sendFile(__dirname+'/views/cmenu.html');
});


app.get('/menu/:id',function(req,res){
  console.log(req.params.id);
});

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });