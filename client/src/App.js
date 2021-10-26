import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </Router>
    
  );
}

export default App;
