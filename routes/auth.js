const express = require('express');
const router = express.Router();


let UserController = require('../controllers/user');



router.post('/signup', UserController.signUp);


router.post('/login',UserController.login);



module.exports = router;