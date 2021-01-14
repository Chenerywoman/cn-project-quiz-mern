const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config( { path: './.env' } );

const app = express();

app.use(express.urlencoded({extended: false})); 
app.use(express.json({extended: false}));
app.use(cors());

// mongoose.connect( process.env.DB_URL, { 
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }).then( () => console.log('MongoDB is Connected')); 

//home page
app.get('/', (req, res) => {
    res.send("Hello from Nodejs");
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




//error handling
app.get("*", (req, res) => {
    res.send("error");
});

app.listen(5000, () => { 
    console.log('server is running on port 5000');
});

