const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// require('dotenv').config();
require('dotenv').config();
const app = express();

// that tells the Express app to automatically parse incoming requests with JSON payloads. 
//This means that it converts the JSON payload of incoming requests into JavaScript objects
app.use(express.json());

// allow requests from localhost:3000
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

// Now process.env.MONGO_URL should be defined
mongoose.connect(process.env.MONGO_URL);

app.get('/api', (req, res) => {
    res.json('Hello from server!');
});

 

app.post('/register', (req, res) => {


    const { name, email, password } = req.body;
    res.json({ name, email, password });

});











app.listen(5000);
