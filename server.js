//=============================================================================
// Basic Config
//=============================================================================
require('dotenv').config();
const express = require('express');
const cors = require ('cors')
const app = express();
const PORT = process.env.PORT || 8080;

//=============================================================================
// Middleware
//=============================================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//=============================================================================
// Routes
//=============================================================================

const users = require('./controllers/users')
app.use('/user', users)
const text = require('./controllers/texts')
app.use('/text', text)
//=============================================================================
// START SERVER
//=============================================================================
app.listen(PORT, () => {
    console.log(`💬 speech audit app listening on port: ${PORT}`);
});