import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getCategories } from './services/api';
import Home from './components/Home';
import Cart from './components/Cart';
import './App.css';

class App extends Component {
  render() {
    getCategories().then((categories) => { console.log(categories); });
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
