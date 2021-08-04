const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user');
const { createUserToken } = require('../middleware/auth')

//SIGN UP - POST
router.post('/signup', async (req,res, next) =>{
    try{
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ email: req.body.email, password})
        res.status(201).json(newUser)
    }catch(error){
        return next(error)
    }
})

router.get('/signin', async (req,res) =>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(error){
        console.log(error)
    }
})

// SIGN IN - POST 
router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});

module.exports = router;