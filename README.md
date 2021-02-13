# Full Stack project using React 

This is a project by [Kat Archer](https://github.com/Kat-Archer) and Rachel Chenery whilst students on the Code Nation Master Coding course.  It is a React website which fetches data from a quiz api and sends information about users and quiz scores to a MongoDB database.

## Project Brief

The project brief was to create a website with various elements:
* authentication of users
* creating & accessing either MongoDB collections or a SQL database.  
* the functionality for a user to select a quiz topic and difficulty level 
* a quiz with questions on the chosen topic and with the chosen difficulty level, with multiple choice answers 
* user information and scores to be stored on the database
* a page with a league table of the players with the highest scores
* a profile page for the logged in user with information about their quiz scores
  

### Authentication

The jwt (jsonwebtoken) package is used to create a unique token for the user which is then stored as a cookie in the browser. The bcrypt package is used to encrypt passwords and compare an inputted password with the encrpyted version stored on the database.

## Frontend

The frontend was created using the create-react-app npm package.  

Dependencies used the frontend include:
*  react-router-dom version 5.2.0
*  axios version 0.21.1

## Backend

The backend used the Express web framework for Node.js. 

Dependencies for the project are:
  * express version 4.17.1
  * hbs (handlebars) version 4.1.1
  * nodemon version 2.0.7
  * jsonwebtoken version 8.5.1
  * cookie-parser version 1.4.5
  * bcryptjs version 2.4.3
  * mongoose version 5.11.11
  * dotenv version 8.2.0
  * cors version 2.8.5
  * concurrently version 5.3.0
   
## Styling and responsiveness

The website (https://coolors.co/) was used to provide a colour scheme for the webpage.  

The website was styled with CSS and made responsive to different screen sizes using media queries.

## Hosting

The project is hosted with Heroku at https://the-quiz-of-awesomeness.herokuapp.com/
