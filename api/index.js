const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fdafkdhnalkfhsjhkl4h1312d';

// that tells the Express app to automatically parse incoming requests with JSON payloads. 
//This means that it converts the JSON payload of incoming requests into JavaScript objects
app.use(express.json());

app.use(cookieParser());
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
            jwt.sign({
                email: userDoc.email, 
                id: userDoc._id,
                

            },
            jwtSecret, 
            {}, 
            (err, token) => {
                if (err) {
                    throw err; // Consider handling the error more gracefully
                }
                // Set the token in the cookie correctly and send a userDoc as response
                console.log(token);
                console.log("userDoc"+userDoc);
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('Unauthorized');
        }
    } else {
        res.json('Not Found');
    }
});

app.get('/profile', async (req, res) => {
        const {token} = req.cookies;

        /*If the ‘token’ exists, the server attempts to verify it using jwt.verify.
        The jwt.verify function checks if the token is valid and has not been tampered with. 
        It uses the secret key (jwtSecret) that was used to sign the token. */
        if (token){
            jwt.verify(token, jwtSecret,{}, async (err, userData) => {
                if (err) throw err;
                const {name,email,_id} = await User.findById(userData.id);
                res.json({name,email,_id});
            });
        }else{
            res.json(null);
        }
       
})









app.listen(4000);
