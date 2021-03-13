const express = require('express');
const router = express.Router();

//Brigin in controller
let MenuController = require('../controllers/menu');


function verifyToken(req,res,next){

  //Get auth header value
  const bearerHeader = req.headers['authorization'];

  //Check if bearer is undefined
  if( typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');

      //Get token from array
      const bearerToken = bearer[1];
      //Set the token
      req.token  = bearerToken;
      next();
  }else{
      //Forbidden
      res.sendStatus(403);
  }
}

//Index view 
//router.get('/',verifyToken, MenuController.all);

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