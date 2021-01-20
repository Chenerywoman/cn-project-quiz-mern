import React, {useState, useCallback, useEffect} from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Selection from './components/Selection';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import League from './components/League';
import ErrorPage from './components/ErrorPage';
import Timer from './components/Timer';
import './App.css';

function App() {
  
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [categories, setCategories] = useState([]);

  const history = useHistory();

  const updateCategory = useCallback((event) => {
    setCategory(event);
  }, []);

  const updateDifficulty = useCallback((event) => {
    setDifficulty(event);
  },[]);

  const fetchCategories = async () => {
      
    try {
        const categories = await axios.get('https://opentdb.com/api_category.php');
        console.log(categories.data.trivia_categories)
        setCategories(categories.data.trivia_categories)

    } catch (error) {
        console.log(error)
        history.push('/error')
    }

  }
      

    useEffect(() => {
        fetchCategories();
    }, [])

   console.log(categories) 
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/selection" render={(props) => 
          <Selection 
            updateCategory={updateCategory} 
            updateDifficulty={updateDifficulty}
            categories={categories}
            {...props}/>} />
        <Route exact path="/quiz" render={() => 
          <Quiz 
            category={category}
            difficulty={difficulty}
            />}
          />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/league" component={League} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/timer" component={Timer} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
