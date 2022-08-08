import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    searchInput: '',
    productsFound: [],
  }

  handleChange = ({ target }) => {
    const { name, type, value } = target;
    const targetValue = type !== 'checkbox' ? value : target.checked;
    this.setState({ [name]: targetValue });
  }

  searchProduct = async () => {
    const { searchInput } = this.state;

    const requestProduct = await getProductsFromCategoryAndQuery('', searchInput);
    const checkIfProductExists = requestProduct.results.length !== 0
      ? requestProduct.results : 'Nenhum produto foi encontrado';
    this.setState({ productsFound: checkIfProductExists });
  }

  render() {
    const { searchInput, productsFound } = this.state;

    const productsList = !Array.isArray(productsFound)
      ? (<div>Nenhum produto foi encontrado</div>) : (
        productsFound.map(({ price, title, thumbnail, id }) => (
          <div data-testid="product" key={ id }>
            <h2>{ title }</h2>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
          </div>
        ))
      );

    return (
      <main>
        <input
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          onClick={ this.searchProduct }
          type="button"
          data-testid="query-button"
        >
          Pesquisar

        </button>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <Link to="/Cart" data-testid="shopping-cart-button">Cart</Link>
        <section>
          { productsList }
        </section>
      </main>
    );
  }
}

export default Home;
