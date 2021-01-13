import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Selection from './components/Selection';
import Quiz from './components/Quiz';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/selection" component={Selection} />
        <Route exact path="/quiz" component={Quiz} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
