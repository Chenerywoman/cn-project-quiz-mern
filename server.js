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



app.listen(5000, () => { 
    console.log('server is running on port 5000');
});