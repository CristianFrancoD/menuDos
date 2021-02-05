const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

let User = require('../models/user');


router.post('/signup', async function(req,res){

    let user = new User({email:req.body.email,password:req.body.password});
    bcrypt.hash(user.password, saltRounds).then(function(hash) {
       user.password = hash;
    });
    let newUser = await User.create(user);
    res.json(newUser);
});


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