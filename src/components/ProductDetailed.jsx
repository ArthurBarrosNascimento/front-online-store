import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';

export default class ProductDetailed extends Component {
  state = {
    product: {},
  }

  componentDidMount() {
    this.productClicked();
  }

  productClicked = async () => {
    const { match: { params: { id } } } = this.props;
    const APIrequest = await getProductFromId(id);
    this.setState({ product: APIrequest });
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
