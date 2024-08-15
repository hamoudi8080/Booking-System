const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const fs = require('fs');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fdafkdhnalkfhsjhkl4h1312d';

const imageDownloader = require('image-downloader');
const multer = require('multer');
// that tells the Express app to automatically parse incoming requests with JSON payloads. 
//This means that it converts the JSON payload of incoming requests into JavaScript objects
app.use(express.json());

app.use(cookieParser());

//without this line, the server would not be able to serve the images or display image in the browser.
// try delete bellow line and go to http://localhost:4000/uploads/photo1720997349771.jpg.
app.use('/uploads', express.static(__dirname + '/uploads'));

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
    const userDoc = await User.findOne({ email });
    debugger
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
                    console.log("userDoc" + userDoc);
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
    const { token } = req.cookies;

    /*If the ‘token’ exists, the server attempts to verify it using jwt.verify.
    The jwt.verify function checks if the token is valid and has not been tampered with. 
    It uses the secret key (jwtSecret) that was used to sign the token. */
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }

})



app.post('/logout', (req, res) => {
    res.clearCookie('token').json('Logged out');
});



app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});
// photosMiddleware.array('photos', 100) is a middleware function provided by multer.
//array('photos', 100) indicates that this route expects an array of files under the field name photos. The 100 is the maximum number of files that can be uploaded in one request.
const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadsFiles = [];
    try {
        for (let i = 0; i < req.files.length; i++) {
            debugger
            const { path, originalname } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
            uploadsFiles.push(newPath.replace('uploads\\', ''));
        }
        console.log(uploadsFiles);
        res.json(uploadsFiles);
    } catch (error) {
        console.error(error);
        res.status(500).json('Failed to process files');
    }
});


app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, 
            address, 
            photos:addedPhotos,
            description, 
            perks, 
            extraInfo, 
            checkInTime,
            checkOutTime,
            maxGuests,
        });
        res.json(placeDoc);
    });
});

app.get('/places', async (req, res) => {

    const { token } = req.cookies;
    //userData: The decoded token payload if the verification is successful. 
    //This typically contains user information encoded in the token.
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      
        const { id } = userData;

        res.json(await Place.find({ owner: id }));
    });


});


app.get('/places/:id', async (req, res) => {   
    const { id } = req.params;
    res.json(await Place.findById(id));
});


app.put('/places/:id', async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;
    const { title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkInTime, checkOutTime, maxGuests
            });
            await placeDoc.save();
            res.json('ok');
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    });
});

app.listen(4000);
