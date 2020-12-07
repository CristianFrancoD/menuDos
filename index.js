var express = require('express');
var app = express();

//use stactic assets for every file
app.use(express.static(__dirname +'/public'));

//logger for al requests
app.use(function(req,res,next){
  req.time = new Date().toString();
  console.log(req.time+": "+req.method+" "+req.path+" - "+req.ip)
  next();
  
  });
  


app.get('/menu',function(req,res){
   
  res.sendFile(__dirname+'/views//menu.html');
});

app.get('/createMenu',function(req,res){
  res.sendFile(__dirname+'/views/cmenu.html');
});



  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });