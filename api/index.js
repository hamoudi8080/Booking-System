const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fdafkdhnalkfhsjhkl4h1312d';

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



app.post('/register', async (req, res) => {

    //Extract Request Body: name, email, password
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });

        res.json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                if (err) {
                    throw err; // Consider handling the error more gracefully
                }
                // Set the token in the cookie correctly and send a success response
                res.cookie('token', token).json({message: 'Login Successful'});
            });
        } else {
            res.status(422).json('Unauthorized');
        }
    } else {
        res.json('Not Found');
    }
});









app.listen(4000);
