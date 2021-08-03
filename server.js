//=============================================================================
// Basic Config
//=============================================================================
require('dotenv').config();
const express = require('express');
const cors = require ('cors')
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

//=============================================================================
// Middleware
//=============================================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//=============================================================================
// Mongo Atlas Connection
//=============================================================================
// Mongo URL and Connection
const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect( mongoURI );

// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Open the Connection
db.on( 'open' , ()=>{
  console.log('💬 connection made!');
});
//=============================================================================
// Routes
//=============================================================================

const users = require('./controllers/users')
app.use('/api', users)

//=============================================================================
// START SERVER
//=============================================================================
app.listen(PORT, () => {
    console.log(`💬 speech audit app listening on port: ${PORT}`);
});