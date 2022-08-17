import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import FormProductDetailed from './FormProductDetailed';

export default class ProductDetailed extends Component {
  state = {
    product: {},
    cartProducts: [],
  }

  componentDidMount() {
    this.productClicked();
  }

  productClicked = async () => {
    const { match: { params: { id } } } = this.props;
    const APIrequest = await getProductFromId(id);
    const localStorageProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (localStorageProducts) {
      this.setState({ cartProducts: localStorageProducts });
    }
    this.setState({ product: APIrequest });
  }

  setOnState = (newState) => {
    this.setState({ cartProducts: newState }, () => {
      const { cartProducts: newCartProducts } = this.state;
      localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    });
  }

  saveOnLocalStorage = (product) => {
    const newProduct = { ...product, quantity: 1 };
    const { cartProducts } = this.state;
    const searchProduct = cartProducts.some(({ id }) => id === product.id);
    if (searchProduct) {
      const newCart = cartProducts.map((produto) => {
        if (produto.id === newProduct.id) {
          return { ...produto, quantity: produto.quantity + 1 };
        }
        return produto;
      });

      this.setOnState(newCart);
    } else {
      this.setOnState([...cartProducts, newProduct]);
    }
  }

  render() {
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    const { match: { params: { id } } } = this.props;

    return (
      <div>
        <h2 data-testid="product-detail-name">{ title }</h2>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <h4 data-testid="product-detail-price">{ price }</h4>
        <Link to="/Cart" data-testid="shopping-cart-button">Cart</Link>
        <div>
          <button
            type="button"
            onClick={ () => this.saveOnLocalStorage({ title, price }) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
        <section>
          <FormProductDetailed id={ id } />
        </section>
      </div>
    );
  }
}

ProductDetailed.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
