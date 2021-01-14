import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Selection from './components/Selection';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState("");

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
        <Route exact path="/quiz" component={Quiz} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
