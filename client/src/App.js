import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home'
import Concept from './Concept';

function App() {
  
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>

      <Switch>
        <Route path ='/dashboard'
          exact component={Dashboard}
        />

        <Route path='/dashboard/:id'
        component={Concept}
        />

        <Route path = '/'>
          <Home/>
        </Route>
      
      </Switch>
    </Router>
  );
}

export default App;
