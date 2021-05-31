import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CardDetail from './Pages/CardDetail';
import Favorites from './Pages/Favorites';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/card/:id" component={CardDetail} />
    <Route exact path="/favorites" component={Favorites} />
    {/* <Route exact path="/favorites/comics" component={FavComics} /> */}
    {/* <Route exact path="/favorites/characters" component={FavCharacters} /> */}
    {/* <Route component={NotFound} /> */}
  </Switch>
);

export default App;
