import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import FilterCategories from './FilterCategories';
import ProductCard from './ProductCard';

const NOT_FOUND = 'Nenhum produto foi encontrado';

class Home extends Component {
  state = {
    searchInput: '',
    productsFound: [],
    categoryId: '',
  }

  handleChange = ({ target }) => {
    const { name, type, value } = target;
    const targetValue = type !== 'checkbox' ? value : target.checked;
    this.setState({ [name]: targetValue }, this.produtcsFromCaterogy);
  }

  searchProduct = async () => {
    const { searchInput } = this.state;

    const requestProduct = await getProductsFromCategoryAndQuery('', searchInput);

    const checkIfProductExists = requestProduct.results.length !== 0
      ? requestProduct.results : NOT_FOUND;
    this.setState({
      productsFound: checkIfProductExists,
      searchInput: '',
    });
  }

  produtcsFromCaterogy = async () => {
    const { categoryId } = this.state;

    const requestProduct = await getProductsFromCategoryAndQuery(categoryId, '');

    this.setState({ productsFound: requestProduct.results });
  }

  render() {
    const { searchInput, productsFound, categoryId } = this.state;

    const productsList = !Array.isArray(productsFound)
      ? (<div>{ NOT_FOUND }</div>) : (
        productsFound.map(({ price, title, thumbnail, id }) => (
          <ProductCard
            key={ id }
            price={ price }
            title={ title }
            thumbnail={ thumbnail }
            productId={ id }
          />
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
        <FilterCategories
          categoryId={ categoryId }
          handleChange={ this.handleChange }
        />
      </main>
    );
  }
}

export default Home;
