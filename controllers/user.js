const bcrypt = require('bcrypt');
const saltRounds = 10;
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
    }
};

module.exports = UserController;