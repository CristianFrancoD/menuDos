const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Bring in model
let User = require('../models/user');

const UserController = {
    signUp: async function(req,res){

        let user = new User({email:req.body.email,password:req.body.password});
        bcrypt.hash(user.password, saltRounds).then(function(hash) {
           user.password = hash;
        });
        let newUser = await User.create(user);
        res.json(newUser);
    },

    login:  async function(req,res){

        try {
            let user = await User.find({email:req.body.email});
            
            jwt.sign({user:user},process.env.SECRET_JWT, (err,token)=>{
                res.json({
                    token:token
                });
            });
        } catch (error) {
            res.json(error);
        }
        
    }
};

module.exports = UserController;