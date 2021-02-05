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
router.post('/create', async function(req,res){
    let menu = 
      {menuName:req.body.menuName,
       description:req.body.description,
       group:req.body.group,
       items:req.body.items};
        
       try {
          let newMenu = await Menu.create(menu);
          res.json(newMenu);
       } catch (error) {
          console.log(error);
          res.json(error);
       }
  

  });
  
  
  //Show specific menu
  router.get('/:id', async function(req,res){
    try {
      let menu = await Menu.findById({_id:req.params.id});
      res.json(menu);
    } catch (error) {
      console.log(error);
      res.json(error);
    }

  });

  //Delete specific Menu

  router.delete('/remove/:id',async function(req,res){

    try {
        let menu = await Menu.deleteOne({_id: req.params.id});
        res.json(menu);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
  });
  

  module.exports = router;