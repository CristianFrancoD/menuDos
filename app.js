const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
app.set('view engine', 'pug')


//makes the conecction whith the database (Mongo Atlas) the MONGO_URI value is in .env file
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


//use stactic assets for every file
app.use(express.static(__dirname +'/public'));


//Bring in Models
let Company = require('./models/company');
let Menu = require('./models/menu'); 
let User = require('./models/user');

//Logger for al requests
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
app.get('/companyCreate',function(req,res){
  res.render(__dirname+'/views/pug/companyCreate');
});

//button(class="deleteBtn" id="deleteBtn", data-id=val._id) Eliminar
app.get('/company/:id',async function(req,res,next){
  try {
    var company = await Company.findById(req.params.id);
    
    res.render(__dirname+'/views/pug/company',{company:company});
  } catch (error) {
    next(error)
  }

});

app.post('/companyCreate',function(req,res){
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

app.delete('/deleteCompany',function(req,res){

})



app.get('/companyAll',async function(req,res, next){
 
  try{
    const companies = await Company.find();
    res.render(__dirname+'/views/pug/companyAll', {companies:companies});
  }catch(error){
    next(error);
  } 
  
});



//Show Menus
app.get('/menusAll',function(req,res){
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
    console.log('Running app listening on port 3000!');
  });