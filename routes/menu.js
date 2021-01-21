const express = require('express');
const router = express.Router();

//Brigin in model
let Menu = require('../models/menu'); 


//Index view 
router.get('/', async function(req,res){
    try {
      const menus = await Menu.find();
      //res.render(__dirname+'/views/pug/menuAll',{menus:menus});
      res.json(menus);
    } catch (error) {
      console.log(error);
    }
   
  });


//Show view to create Menus
router.get('/add', async function(req,res){
    res.render(__dirname+'/views/pug/menuCreate');
  });
  
  //Create Menus
router.post('/add',function(req,res){
    let menu = 
      new Menu({menuName:req.body.menuName,
       description:req.body.description,
       group:req.body.group,
       main:req.body.main})
  
  
       menu.save(menu,function(err,menu){
         if(err){
          return console.log(err);
         }else{
           console.log(menu);
           res.redirect("/");
         }
       });
  });
  
  
  //Show specific menu
  router.get('/:id',function(req,res){
    console.log(req.params.id);
    Menu.findById({_id:req.params.id},function(err,menu){
      if(err){
        return console.log(err);
      }else{
        console.log(menu);
      }
    })
  });
  

  module.exports = router;