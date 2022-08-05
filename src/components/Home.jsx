import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <main>
        <input
          type="text"
        />
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <Link to="/Cart" data-testid="shopping-cart-button">Cart</Link>
      </main>
    );
  }
}

export default Home;
