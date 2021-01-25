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
import Logout from './components/Logout';
import LocationError from './components/LocationError';
import './App.css';

function App() {
  
  const [category, setCategory] = useState("9");
  const [categoryName, setCategoryName] = useState("General Knowledge")
  const [difficulty, setDifficulty] = useState("easy");
  const [categories, setCategories] = useState([]);
  const [sessionToken, setSessionToken] = useState("");

  const history = useHistory();


  const getSessionToken = async () => {  
    console.log('in get session token') 
    try {
        const sessionTokenResponse = await axios.get('https://opentdb.com/api_token.php?command=request');
        setSessionToken(sessionTokenResponse.data.token);
    } catch (error){
      console.log(error)
      history.push('/error')
    }
  };

  const updateSessionToken = async () => {
    console.log('in update session token')

    try {

      const updateSessionTokenResponse = await axios.get(`https://opentdb.com/api_token.php?command=reset&token=${sessionToken}`);

      console.log(sessionToken)
      console.log(updateSessionTokenResponse)
      return updateSessionTokenResponse.data.response_code;

    } catch (error){
      console.log(error)
      history.push('/error')
    }
  };


  const updateCategory = useCallback((event) => {

    setCategory(event);
  }, []);

  const updateCategoryName = useCallback((name) => {

    setCategoryName(name)
  }, [])

  const updateDifficulty = useCallback((event) => {
    setDifficulty(event);
  },[]);

  const updateCategoryAndName = (event) => {

    const categoryName = categories.find(elem => elem.id.toString() === event).name

    setCategoryName(categoryName)
    setCategory(event)

  }

  const fetchCategories =  useCallback(async () => {
      
    try {
        const categories = await axios.get('https://opentdb.com/api_category.php');
        console.log(categories.data.trivia_categories)
        setCategories(categories.data.trivia_categories)

    } catch (error) {
        console.log(error)
        history.push('/error')
    }

  }, [history]) 
      

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

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
            updateCategoryName={updateCategoryName}
            updateCategoryAndName={updateCategoryAndName}
            categories={categories}
            {...props}/>} />
        <Route exact path="/quiz" render={() => 
          <Quiz 
            category={category}
            categoryName={categoryName}
            difficulty={difficulty}
            getSessionToken={getSessionToken}
            updateSessionToken={updateSessionToken}
            sessionToken={sessionToken}
            />}
          />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/league" component={League} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/timer" component={Timer} />
        <Route exact path="/logout" component={Logout} />
        <Route path="*" component={LocationError} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
