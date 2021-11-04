import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Search from "./pages/search/Search";
import Followers from './pages/followers/Followers';
import Following from './pages/following/Following';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Home /> : <Register />}
        </Route>
        <Route path='/profile/:username'>
          <Profile />
        </Route>
        <Route path='/login'>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path='/register'>
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path='/leaderboard'>
          <Leaderboard />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/followers/:username'>
          <Followers />
        </Route>
        <Route path='/following/:username'>
          <Following />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
