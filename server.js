const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/userModel'); //when importing a model, use a capital letter, use this to accessdb
const Result = require('./models/resultModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser'); //needs to be initialised
// const auth = require('./middleware/auth');

dotenv.config( { path: './.env' } );

const app = express();

app.use(express.urlencoded({extended: false})); 
app.use(express.json({extended: false}));
app.use(cors());

mongoose.connect( process.env.DB_URL, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( () => console.log('MongoDB is Connected')); 

//home page
app.get('/', (req, res) => {
    res.send("Hello from Nodejs");
});

//Registering
app.post('/register', async (req, res) => {
    //test
    console.log("reaching register on backend");
    console.log(req.body.userPassword);
    console.log(req.body.confPassword);

    //check that the passwords are the same
    if (req.body.userPassword !== req.body.confPassword) {
        res.json({ //sending message to front-end
            message: "Passwords do not match"
        });
    } else {
        //check that the email does not already exist
        const alreadyExists = await User.find({email: req.body.userEmail});
        
        if (alreadyExists.length > 0) {
            res.json({ //sending message to front-end
                message: "That email already exists"
            });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.userPassword, 13);
            await User.create({
                name: req.body.userName,
                email: req.body.userEmail,
                password: hashedPassword
            });
            res.json({ //sending message to front-end
                message: "User registered"
            });
        }
    }   

    
});

//quiz scores
app.post('/quiz', (req, res) => {
    console.log("reaching backend"); //checking data is received on backend
    console.log(req.body);

    // await Results.create({
    //     score: req.body.score,
    //     category: req.body.category,
    //     difficulty: req.body.difficulty,
    //     time: req.body.time,
    //     id: req.body.id, //add later after User db created
    // })

    res.json({ //sending message to front-end
        message: "Message received"
    });
});

//Pull data for Profile Component
app.get('/profile', (req, res) => {
    //const userInfo = User.find(); //DB pull for user info
    //const resultsInfo = Results.find(); //DB pull for results info

    res.json({
        users:
            {
                name: "Dave",
                email: "email@domain.com"
            },
        results:
            {
                totalQuiz: 4,
                totalScore: 32,
                AvScore: 8,
                fastTime: "1:22",
                avTime: "2:17",
                position: "1st",
                topPosition: "1st", //needs an if but hard-coded for now
                score: 9,
                time: "0:58",
                category: "General Knowledge",
                difficulty: "Easy"
            }
        }
    );
});

//Pull data for League Component
app.get('/league', (req, res) => {
    //const userInfo = User.find(); //DB pull for user info
    //const resultsInfo = Results.find(); //DB pull for results info

    res.json({
        users:
            {
                name: "Dave",
            },
        results:
            {
                score: 9,
                time: "0:58",
                category: "General Knowledge",
                difficulty: "Easy"
            }
        }
    );
});


//error handling
app.get("*", (req, res) => {
    res.send("error");
});

app.listen(5000, () => { 
    console.log('server is running on port 5000');
});

