import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Home from './components/Home';
import Selection from './components/Selection';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import League from './components/League';
import './App.css';

function App() {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [sessionToken, setSessionToken] = useState("");

  const getSessionToken = async () => {   
    const sessionTokenResponse = await axios.get('https://opentdb.com/api_token.php?command=request');
    setSessionToken(sessionTokenResponse.data.token);
  };

  const updateSessionToken = async (token) => {
    const updatedSessionTokenResponse = await axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
    setSessionToken(updatedSessionTokenResponse.data.token)
  }

  const updateCategory = (event) => {
    setCategory(event);
  };

  const updateDifficulty = (event) => {
    setDifficulty(event);
  };

  console.log(sessionToken)
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/selection" render={(props) => 
          <Selection 
            updateCategory={updateCategory} 
            updateDifficulty={updateDifficulty}
            {...props}/>} />
        <Route exact path="/quiz" render={() => 
          <Quiz 
            category={category}
            difficulty={difficulty}
            sessionToken={sessionToken}
            getSessionToken={getSessionToken}
            updateSessionToken={updateSessionToken}
            />}
          />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/league" component={League} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
