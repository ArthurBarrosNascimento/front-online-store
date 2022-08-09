import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartProducts: [],
    cartQuantity: 0,
  }

  componentDidMount() {
    this.getProductsFromStorage();
    if (localStorage.length === 0) localStorage.setItem('cartProducts', []);
  }

  getProductsFromStorage = () => {
    const localStorageProducts = JSON.parse(localStorage.getItem('cartProducts'));
    const localStorageVerify = !localStorageProducts ? [] : localStorageProducts;
    const quantity = !localStorageProducts ? 0 : localStorageProducts.length;
    this.setState({
      cartProducts: localStorageVerify,
      cartQuantity: quantity,
    });
  }

  render() {
    const { cartProducts, cartQuantity } = this.state;

    const productsList = cartProducts.map(({ title, price }, index) => (
      <div key={ index }>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <p>{ price }</p>
      </div>
    ));

    return (
      <main>
        { cartProducts.length === 0 ? (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        ) : (
          <div>
            <h4 data-testid="shopping-cart-product-quantity">{ cartQuantity }</h4>
            { productsList }
          </div>
        )}
      </main>
    );
  }
}

export default Cart;
