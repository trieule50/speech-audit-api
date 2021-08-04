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
router.post('/signup', async (req,res, next) =>{
    try{
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ email: req.body.email, password})
        res.status(201).json(newUser)
    }catch(error){
        return next(error)
    }
})
```

#### Dynamic API Calls

#### Testing Routes on Postman

## Problem Areas
 
## Future Directions

## Accomplishments

## References
- [IBM Watson - Tone Analysis](https://cloud.ibm.com/apidocs/tone-analyzer?code=node#data-handling)
- [IBM Watson - Speech to Text](https://cloud.ibm.com/apidocs/speech-to-text?code=node)




