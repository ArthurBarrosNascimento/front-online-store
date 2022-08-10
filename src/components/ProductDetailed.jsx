import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';

export default class ProductDetailed extends Component {
  state = {
    product: {},
    cartProducts: [],
  }

  componentDidMount() {
    this.productClicked();
  }

  getLocalStorage = () => {
    const localStorageProducts = JSON.parse(localStorage.getItem('cartProducts'));
    const localStorageVerify = !localStorageProducts ? [] : localStorageProducts;
    this.setState({ cartProducts: localStorageVerify }, () => {
      const { cartProducts } = this.state;
      localStorage.setItem('cartProducts', cartProducts);
    });
  }

  productClicked = async () => {
    const { match: { params: { id } } } = this.props;
    const APIrequest = await getProductFromId(id);
    this.setState({ product: APIrequest });
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
    const { product } = this.state;
    const { title, thumbnail, price } = product;
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
