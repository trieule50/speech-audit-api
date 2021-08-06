# Speech Audit
![Image of People Speaking](https://image.flaticon.com/icons/png/512/1141/1141031.png)

## Project Description
Has there ever been a situation where you were unsure how a sentence or paragraph is perceived by others? With the help of this app, Speech Audit, and IBM's Speech to Text and Tone Analyzer API, users are able to see what emotion others may perceive in your sentence!

**Link To Site:** LINK ONCE DEPLOYED

## Preparation
1. Fork and clone this repository
2. Install dependencies with `<npm i>`
3. Run the development server with `<npm run dev>`

### Programs/Application Used:
- Express
- MongoDB
- Mongoose
- IBM Watson

## Learning Experience

## Setting Up Project
One key task for setting up the project is reading and understanding IBM's Speech to Text and Tone Analysis documentation. (Links under References). IBM's API could be calls by either cloud functionality or client side, for this project I chose to create a server to make this call. The reason being that I wanted to parse data in the application. 

### Setting Up Core Structure
#### Models
##### User Model
One of the feature, I wanted for the application is user authentication. Creating a model that contain an email and password.

```JS
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    }, 
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
```

#### Controllers
##### Users Controller
To prevent saving the user's password in plain text and with the help of the `<bcrypt>` package, user's password are stored a hash of the password.

```JS
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user');

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
```

The Sign In routes does two functions: find the email and create the user token but using the passport-jwt middleware package. 

```JS
// SIGN IN - POST 
router.post('/login', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token, email: req.body.email, id: req.params.id, }))
		.catch(next);
});
```
The get user info was creating with the mindset that the sign in route will return the token and email which in return gets stored to the local storage.

```JS
// Get User Info
router.post('/login/:id', async (req,res) =>{
    try{
        const user = await User.findOne({ email: req.body.email })
        res.json(user)
    }catch(error){
        console.log(error)
    }
})
```
#### Dynamic API Calls / Creating Routes
From reading the [IBM Watson - Tone Analysis](https://cloud.ibm.com/apidocs/tone-analyzer?code=node#data-handling) documentation, a post route was creating for the API request. The response sends 2 tone results per call. 

```JS
// POST (create) 
router.post('/', (req, res) => {  
  const toneParams = {
    toneInput: { 'text': req.body.text },
    contentType: 'application/json',
  };
  
  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      res.send((JSON.stringify(toneAnalysis, null, 2)));
    })
    .catch(err => {
      console.log('error:', err);
    });
});
```

#### Testing Routes on Postman
##### Text to Tone Route Check on Postman
![Screen Shot 2021-08-06 at 10 23 04 AM](https://media.git.generalassemb.ly/user/36270/files/70594c00-f6a1-11eb-9dbb-3c3bfff8a35c)

##### Create User Route Check on Postman
![Screen Shot 2021-08-06 at 10 31 56 AM](https://media.git.generalassemb.ly/user/36270/files/ac8cac80-f6a1-11eb-8f5c-43c9d212519e)

##### Sign in Route Check on Postman
![Screen Shot 2021-08-06 at 10 32 21 AM](https://media.git.generalassemb.ly/user/36270/files/b0203380-f6a1-11eb-82f8-27615fc804b2)


## Problem Areas
 
## Future Directions

## Accomplishments
- User Authentication Routes Functional
- Text to Tone Post Routes Functional

## References
- [IBM Watson - Tone Analysis](https://cloud.ibm.com/apidocs/tone-analyzer?code=node#data-handling)
- [IBM Watson - Speech to Text](https://cloud.ibm.com/apidocs/speech-to-text?code=node)




