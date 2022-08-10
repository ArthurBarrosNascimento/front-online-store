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
    cartProducts: [],
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

  saveOnLocalStorage = (product) => {
    const xablau = { ...product, quantity: 1 };
    const { cartProducts } = this.state;
    const teste = cartProducts.some((cartProduct) => cartProduct.id === product.id);
    if (teste) {
      const newCart = cartProducts.map((produto) => {
        if (produto.id === xablau.id) {
          return { ...produto, quantity: produto.quantity + 1 };
        }
        return produto;
      });

      this.setState({ cartProducts: newCart }, () => {
        const { cartProducts: newCartProducts } = this.state;
        localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
      });
    } else {
      this.setState(() => (
        { cartProducts: [...cartProducts, xablau] }
      ), () => {
        const { cartProducts: newCartProducts } = this.state;
        localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
      });
    }
  }

  render() {
    const { searchInput, productsFound, categoryId } = this.state;

    const productsList = !Array.isArray(productsFound)
      ? (<div>{ NOT_FOUND }</div>) : (
        productsFound.map(({ price, title, thumbnail, id }) => (
          <div key={ id }>
            <ProductCard
              price={ price }
              title={ title }
              thumbnail={ thumbnail }
              productId={ id }
            />
            <button
              type="button"
              data-testid="product-add-to-cart"
              onClick={ () => this.saveOnLocalStorage({ title, price, id }) }
            >
              Salvar no carrinho
            </button>
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
        <FilterCategories
          categoryId={ categoryId }
          handleChange={ this.handleChange }
        />
      </main>
    );
  }
}

export default Home;
