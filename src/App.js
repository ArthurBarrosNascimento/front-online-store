import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetailed from './components/ProductDetailed';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route
            exact
            path="/productDetailed/:id"
            render={ (props) => <ProductDetailed { ...props } /> }
          />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
