import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Selection from './components/Selection';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const updateCategory = (event) => {
    setCategory(event);
  };

  const updateDifficulty = (event) => {
    setDifficulty(event);
  };

  return (
    <BrowserRouter>
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
            />}
          />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
