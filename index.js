var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config();

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: String
});


const Menu = mongoose.model("Menu", menuSchema);

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

  

//Show Menus
app.get('/menus',function(req,res){
   Menu.find().exec(function(err,menus){
     if(err){
       return console.log(err);
     }else{
       console.log(menus);
       res.json(menus);
     }
   })
});

//Show view to create Menus
app.get('/createMenu',function(req,res){
  res.sendFile(__dirname+'/views/cmenu.html');
});

//Create Menus
app.post('/createMenu',function(req,res){
  let menu = new Menu(
    {name:req.body.name,
     price:req.body.price,
     desc:req.body.desc});

     menu.save(function(err,menu){
       if(err){
        return console.log(err);
       }else{
         console.log(menu);
         res.redirect("/createMenu");
       }
     });
});


//Show specific menu
app.get('/menu/:id',function(req,res){
  console.log(req.params.id);
  Menu.findById({_id:req.params.id},function(err,menu){
    if(err){
      return console.log(err);
    }else{
      console.log(menu);
    }
  })
});

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });