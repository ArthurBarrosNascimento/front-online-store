import React, { Component } from 'react';

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
      </main>
    );
  }
}

export default Home;
