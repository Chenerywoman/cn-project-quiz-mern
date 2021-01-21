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
const { response } = require('express');

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

//login page
app.get('/login', auth.isLoggedIn, async (req, res) => {
    if(req.userFound) {
        res.json({
            message: "Already logged in"
        });
    } else {
        console.log("reaching register on backend");
    };
});

//Logging in
app.post('/login', auth.isLoggedIn, async (req, res) => {
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
    };
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
app.get('/profile', auth.isLoggedIn, async (req, res) => {
    if(req.userFound) {
        console.log("found")
    
    try{    
        const resultInfo = await Result.find({ user: req.userFound._id });
        console.log(resultInfo);

        //stat calculation
        const quizzes = resultInfo.length;
        let totScores = 0;
        let times = [];
        for(let i = 0; i < resultInfo.length; i++) {
            totScores += resultInfo[i].score; 
            times.push(resultInfo[i].time); //need to convert from str
        };
        const aveScore =  totScores/quizzes;

        //convert times from string
        let newArr = [];
        let fastest = [];
        let fastestPos = 0;
        let totTime = 0;

    //Probably need to build in if takes 10 mins or longer
        for(let i = 0; i < times.length; i++) {
            let hms = "01:" + times[i]; //gives hours:minutes:seconds +1hour otherwise it won't work
            let fullTime = new Date("1970-01-01T" + hms); //gives full date and time including date of 1/1/70 to allow you to extract time as milliseconds

            timeMS = fullTime.getTime(); //extracts time in milliseconds
            newArr.push(timeMS); //pushes ms to an array
            totTime += timeMS;

            if (fastest.length === 0) { //fastest starts as empty array
                fastest.push(timeMS);
            } else if (fastest[0] > timeMS) {
                fastest.push(timeMS);
                fastest.shift();
                fastestPos = [i];
            }
        };
        
        const aveMS = totTime / resultInfo.length; //converting fastest in ms to useable string
        const aveMS2 = new Date(aveMS);
        const aveMS3 = aveMS2.toString();
        const aveTime = aveMS3.slice(19, 24);

        res.json({
            users:
                {
                    name: req.userFound.name,
                    email: req.userFound.email,
                },
            results:
                {
                    totalQuiz: quizzes,
                    totalScore: totScores,
                    AvScore: aveScore,
                    fastTime: resultInfo[fastestPos].time,
                    avTime: aveTime,
                    // position: "1st",
                    // topPosition: "1st", //needs an if but hard-coded for now
                    score: resultInfo[resultInfo.length - 1].score,
                    time: resultInfo[resultInfo.length - 1].time,
                    category: resultInfo[resultInfo.length - 1].category,
                    difficulty: resultInfo[resultInfo.length - 1].difficulty
                }
            }
        );
        
    } catch(error) {
        res.json({
            users:
                {
                    name: req.userFound.name,
                    email: req.userFound.email,
                },
            results:
                {
                    totalQuiz: 0,
                    totalScore: 0,
                    AvScore: 0,
                    fastTime: 0,
                    avTime: 0,
                    score: 0,
                    time: 0,
                    category: 0,
                    difficulty: 0
                }
            }
        );
    }
    } else {
        console.log("not found")
        res.json({ //sending message to front-end
            message: "user not found"
        });
    };
    
});

//Pull data for League Component
app.get('/league', async (req, res) => {
    const resultInfo = await Result.find().populate('user', 'name'); //DB pull for results info

    resultInfo.sort(function (result1, result2) {
        if (result1.score > result2.score) return -1;
        if (result2.score > result1.score) return 1;
        if (result1.score === result2.score) {
            if (result1.time > result2.time) return 1;
            if (result2.time > result1.time) return -1;
        };
    });
    const topTen = resultInfo.slice(0, 10);
    
    res.json({
        results: topTen
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

