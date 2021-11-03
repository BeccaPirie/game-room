import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Search from "./pages/search/Search";
import Followers from './pages/followers/Followers';
import Following from './pages/following/Following';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/profile/'> {/* :username */}
          <Profile />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/leaderboard'>
          <Leaderboard />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/followers'>
          <Followers />
        </Route>
        <Route path='/following'>
          <Following />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
