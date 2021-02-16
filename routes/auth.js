const express = require('express');
const router = express.Router();


let UserController = require('../controllers/user');


router.post('/signup', UserController.signUp);


router.post('/login', async function(req,res){
    try {
        let user = User.find({email:req.body.email}).exec();;
        console.log(user);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
    
});



module.exports = router;