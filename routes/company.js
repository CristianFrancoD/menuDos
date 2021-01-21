const express = require('express');
const router = express.Router();




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

