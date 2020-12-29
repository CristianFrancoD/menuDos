var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config();
app.set('view engine', 'pug')


var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  Menuname: { type: String, required: true },
  items : [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: String,
    hidden: Boolean
  }],
  available: Boolean,
  //created_By: reference to User logged

});

const companySchema = new Schema({
  companyName:{type:String, required: true},
  social_reason:{type:String, required:true},
  address: {type:String}
  //created_By: reference to User logged

});

const userSchema = new Schema({
  email: {type:String, required:true},
  firstName: {type:String, required:true},
  lastName: {type:String, required:true}
});
const Menu = mongoose.model("Menu", menuSchema);
const Company = mongoose.model("Company",companySchema);


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

  
//Index view 
app.get('/',function(req,res){
  res.render(__dirname+'/views/pug/index', {logged: true});
});


//Company routes
app.get('/companyAll',function(req,res){
  res.render(__dirname+'/views/pug/company');
});

app.post('/createCompany',function(req,res){
  let company = new Company({
    companyName:req.body.name,
    social_reason: req.body.social_reason,
    address: req.body.address
  });

  company.save(function(err,company){
    if(err){
      console.log(err);
    }else{
      console.log(company);
      res.redirect("/companyAll");
    }
  })
});




app.get('/company',async function(req,res, next){
 
  try{
    const companies = await Company.find();
    res.render(__dirname+'/views/pug/companyAll', {companies:companies});
  }catch(e){
    next(e);
  } 

  /*Company.find().exec(function(err,data){
    if(err){
      console.log(err);
    }else{
      
      companies = data;
      console.log(companies);
    }
  });*/
  
});



//Show Menus
app.get('/menus',function(req,res){
  /* Menu.find().exec(function(err,menus){
     if(err){
       return console.log(err);
     }else{
       console.log(menus);
       res.json(menus);
     }
   })*/
   res.render(__dirname+'/views/pug/menuAll.pug');
});

//Show view to create Menus
app.get('/createMenu',function(req,res){
  res.render(__dirname+'/views/pug/menu.pug');
});

//Create Menus
app.post('/createMenu',function(req,res){
  let menu = new Menu(
    {name:req.body.name,
     price:req.body.price,
     desc:req.body.desc,
     hidden:req.body.hidden},
   );

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