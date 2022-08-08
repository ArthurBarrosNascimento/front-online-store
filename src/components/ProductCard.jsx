import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { price, title, thumbnail } = this.props;
    return (
      <div data-testid="product">
        <h2>{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
