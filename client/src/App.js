import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Search from "./pages/search/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
