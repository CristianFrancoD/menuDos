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
 * Bring in Models
 */
let Company = require('./models/company');
let User = require('./models/user');

/**
 * Middleware
 */
//Logger for al requests
app.use(function(req,res,next){
  req.time = new Date().toString();
  console.log(req.time+": "+req.method+" "+req.path+" - "+req.ip)
  next();
  
  });

//BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));

//use stactic assets for every file
app.use(express.static(__dirname +'/public'));
  
/**
 * Routes
 */


/**
 * Company Routes
 */
//Creates Company
app.get('/companyCreate',function(req,res){
  res.render(__dirname+'/views/pug/companyCreate');
});

//button(class="deleteBtn" id="deleteBtn", data-id=val._id) Eliminar
//Gets specific company
app.get('/company/:id',async function(req,res,next){
  try {
    var company = await Company.findById(req.params.id);
    
    res.render(__dirname+'/views/pug/company',{company:company});
  } catch (error) {
    next(error)
  }

});

//Creates a company
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

//Deletes an specific company
app.delete('/deleteCompany/:id', async function(req,res){
  let id= {_id:req.params.id}
  try {
    let deleteCompany = await Company.remove(id);
    console.log("Deleted succed, number of deleted docs"+deleteCompany.deletedCount);
    res.redirect('/companyAll');
  } catch (error) {
    console.log(error);
    return;
  }
})

//Gets all companies
app.get('/companyAll',async function(req,res, next){
 
  try{
    const companies = await Company.find();
    res.render(__dirname+'/views/pug/companyAll', {companies:companies});
  }catch(error){
    next(error);
  } 
  
});

/**
 * Menus Routes
 */

let menu = require('./routes/menu');
app.use('/menu',menu);





app.listen(3000, function () {
  console.log('Running app listening on port 3000!');
});