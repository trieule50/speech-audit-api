const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user');
const { createUserToken } = require('../middleware/auth')

//SIGN UP - POST
router.post('/register', async (req,res, next) =>{
    try{
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ email: req.body.email, password})
        res.status(201).json(newUser)
    }catch(error){
        return next(error)
    }
})


// SIGN IN - POST 
router.post('/login', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token, email: req.body.email, id: req.params.id, }))
		.catch(next);
});

router.get('/login/:id', async (req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;