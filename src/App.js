import React, { Component } from 'react';
import { getCategories } from './services/api';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    getCategories().then((categories) => { console.log(categories); });
    return (
      <Home />
    );
  }
}

export default App;
