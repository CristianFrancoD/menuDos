const express = require('express');
const router = express.Router();

//Brigin in controller
let MenuController = require('../controllers/menu');

//Index view 
router.get('/', MenuController.all);


//Show view to create Menus
/*router.get('/add', async function(req,res){
    res.render(__dirname+'/views/pug/menuCreate');
  });*/
  
//Create Menus
router.post('/create',MenuController.create);
  
  
//Show specific menu
router.get('/:id', MenuController.findById);


//Delete specific Menu
router.delete('/remove/:id',MenuController.delete);

//Edit specific Menu
router.put('/edit/:id',MenuController.edit);
  

module.exports = router;