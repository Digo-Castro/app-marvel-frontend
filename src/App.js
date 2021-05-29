import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    {/* <Route exact path="/user" component={EditUser} /> */}
    {/* <Route exact path="/comics" component={Comics} /> */}
    {/* <Route exact path="/characters" component={Characters} /> */}
    {/* <Route exact path="/comics/:id" component={ComicsDetails} /> */}
    {/* <Route exact path="/characters/:id" component={CharactersDetails} /> */}
    {/* <Route exact path="/favorites" component={Favorites} /> */}
    {/* <Route exact path="/favorites/comics" component={FavComics} /> */}
    {/* <Route exact path="/favorites/characters" component={FavCharacters} /> */}
    {/* <Route component={NotFound} /> */}
  </Switch>
);

export default App;
