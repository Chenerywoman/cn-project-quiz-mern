const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/userModel'); //when importing a model, use a capital letter, use this to accessdb
const Result = require('./models/resultModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); //needs to be initialised
const auth = require('./middleware/auth');

dotenv.config( { path: './.env' } );

const app = express();

app.use(express.urlencoded({extended: false})); 
app.use(express.json({extended: false}));
app.use(cors());
app.use(cookieParser());

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
    // console.log(req.body.userPassword);
    // console.log(req.body.confPassword);

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

//Logging in
app.post('/login', async (req, res) => {
    //test
    console.log("reaching register on backend");
    console.log(req.body.userEmail);
    console.log(req.body.userPassword);

    try{
        const user = await User.findOne({email: req.body.userEmail}); // finds full object

        const isMatch = await bcrypt.compare(req.body.userPassword, user.password ); //compares the two passwords and returns a boolean

    
        if (isMatch) {
            const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET, { //jwt is jsonwebtoken which creates the unique token for the user which is then stored as a cookie in the browser
                expiresIn: process.env.JWT_EXPIRES_IN
            }); 
            
            console.log(token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ), 
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions); //creating the cookie on your browser(name of cookie, value of cookie, how long is cookie valid)

            res.json({ //sending message to front-end
                message: "Login Successful"
            });
        } else {
            res.json({ //sending message to front-end
                message: "Your login details are incorrect"
            });
        }
    } catch(error) {
        res.json({ //sending message to front-end
            message: "This user does not exist"
        });
    }
  
});

//quiz scores
app.post('/quiz', auth.isLoggedIn, async (req, res) => {
    console.log("reaching backend"); //checking data is received on backend
    console.log(req.body.score);
    console.log(req.body.time);
    console.log(req.body.category);
    console.log(req.body.difficulty);
    console.log(req.userFound._id);
    console.log('req.userFound')
    console.log(req.userFound)
    
    try {

        if (req.userFound) {

            await Result.create({
                score: req.body.score,
                time: req.body.time,
                category: req.body.category,
                difficulty: req.body.difficulty,
                user: req.userFound._id
            })
        
            res.json({ //sending message to front-end
                message: "Results logged"
            });
    
        } else {
    
            res.json({
                message: "not logged-in"
            });
    
        }

    } catch (error) {
        console.log(error)
    }
   

});

//Pull data for Profile Component
app.get('/profile', auth.isLoggedIn, (req, res) => {
    const userInfo = User.find(); //DB pull for user info
    //const resultsInfo = Results.find(); //DB pull for results info

    try{
        if(req.userFound) {
            res.json({
                users:
                    {
                        name: req.userFound.name,
                        email: req.userFound.email,
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
        } else {
            res.json({ //sending message to front-end
                message: "user not found"
            });
        }
    } catch(error) {
        res.json({ //sending message to front-end
            message: "login not found"
        });
    };


    
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

