import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartProducts: JSON.parse(localStorage.getItem('cartProducts')),
    quantyProducts: 0,
  }

  componentDidMount() {
    const { cartProducts } = this.state;
    this.setState({
      quantyProducts: cartProducts.length,
    });
  }

  render() {
    const { cartProducts, quantyProducts } = this.state;
    const productsList = cartProducts.map((
      { price, title }, index,
    ) => (
      <div key={ index }>
        <h2 data-testid="shopping-cart-product-name">{ title }</h2>
        <h2>{ price }</h2>
      </div>
    ));
    return (
      <main>
        {!cartProducts.length
          ? (
            <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
          )
          : (
            <div>
              { productsList }
              <h2 data-testid="shopping-cart-product-quantity">{ quantyProducts }</h2>
            </div>
          )}
      </main>
    );
  }
}

export default Cart;
