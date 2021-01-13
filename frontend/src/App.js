import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Selection from './components/Selection';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/selection" component={Selection} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
