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

  increaseQuantity = (product) => {
    const { cartProducts } = this.state;
    const newCart = cartProducts.map((produto) => {
      if (produto.id === product.id) {
        return { ...produto, quantity: produto.quantity + 1 };
      }
      return produto;
    });

    this.setState({ cartProducts: newCart }, () => {
      const { cartProducts: newCartProducts } = this.state;
      localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    });
  }

  decreaseQuantity = (product) => {
    const { cartProducts } = this.state;
    const newCart = cartProducts.map((produto) => {
      if (produto.id === product.id) {
        return { ...produto, quantity: produto.quantity - 1 };
      }
      return produto;
    });

    this.setState({ cartProducts: newCart }, () => {
      const { cartProducts: newCartProducts } = this.state;
      localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    });
  }

  removeProduct = (product) => {
    const { cartProducts } = this.state;
    const filteredArray = cartProducts
      .filter((cartProduct) => cartProduct.id !== product.id);

    const newQuantity = filteredArray.length;

    this.setState({ cartProducts: filteredArray, cartQuantity: newQuantity });
  }

  render() {
    const { cartProducts, cartQuantity } = this.state;

    const productsList = cartProducts.map(({ title, price, id, quantity }, index) => (
      <div key={ index }>
        <div>
          <h3 data-testid="shopping-cart-product-name">{ title }</h3>
          <p>{ price }</p>
          <h4 data-testid="shopping-cart-product-quantity">
            {quantity}
          </h4>
          <button
            type="button"
            onClick={ () => this.removeProduct({ title, price, id }) }
            data-testid="remove-product"
          >
            X
          </button>
          <button
            type="button"
            onClick={ () => this.increaseQuantity({ title, price, id }) }
            data-testid="product-increase-quantity"
          >
            +
          </button>
          <button
            type="button"
            onClick={ () => this.decreaseQuantity({ title, price, id }) }
            data-testid="product-decrease-quantity"
            disabled={ quantity <= 1 }
          >
            -
          </button>
        </div>
      </div>
    ));

    return (
      <main>
        { cartProducts.length === 0 ? (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        ) : (
          <div>
            <h4>
              Total de itens:
              {' '}
              { cartQuantity }
            </h4>
            { productsList }
          </div>
        )}
      </main>
    );
  }
}

export default Cart;
