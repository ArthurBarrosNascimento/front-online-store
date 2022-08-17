import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

export default class FormForProductsDetailed extends Component {
  state = {
    emailInput: '',
    avaliationInput: '',
    rating: '',
    avaliation: [],
    invalidEmail: false,
    invalidForm: false,
    productId: '',
  }

  componentDidMount() {
    this.getAvaliationsFromStorage();
  }

  handleChange = ({ target }) => {
    const { name, type, value } = target;
    const targetValue = type !== 'checkbox' ? value : target.checked;
    this.setState({ [name]: targetValue }, this.enableButton);
  }

  getAvaliationsFromStorage = () => {
    const { id } = this.props;
    this.setState({ productId: id }, () => {
      const { productId } = this.state;
      const localStorageAvaliation = JSON.parse(localStorage.getItem(productId));
      if (localStorageAvaliation) {
        this.setState({ avaliation: localStorageAvaliation });
      }
    });
  }

  submit = () => {
    const { emailInput, avaliationInput, rating, invalidEmail } = this.state;
    const avaliationObject = {
      email: emailInput,
      avaliation: avaliationInput,
      rate: rating,
    };

    const check = rating === '' || invalidEmail;
    if (check) {
      return this.setState({ invalidForm: true });
    }

    return emailInput.length !== 0
      ? this.setState(({ avaliation }) => ({
        avaliation: [...avaliation, avaliationObject],
        invalidForm: false,
      }), () => {
        const { avaliation } = this.state;
        const { id } = this.props;
        localStorage.setItem(id, JSON.stringify(avaliation));
        this.setState({ emailInput: '', avaliationInput: '', rating: '' });
      })
      : this.setState(({ avaliation }) => ({
        avaliation: [...avaliation, avaliationObject],
        invalidForm: false,
      }));
  }

  enableButton = () => {
    const { emailInput } = this.state;
    const checkEmail = emailInput.match(/[^\w\s]/gi);

    if (!checkEmail) {
      this.setState({ invalidEmail: true });
    } else {
      this.setState({ invalidEmail: false });
    }
  }

  render() {
    const { emailInput, avaliationInput, avaliation, invalidForm } = this.state;

    const commentsMap = avaliation.map(({ email, avaliation: comment, rate }, index) => (
      <div key={ index }>
        <h4 data-testid="review-card-email">{ email }</h4>
        <span data-testid="review-card-rating">{ rate }</span>
        <p data-testid="review-card-evaluation">{ comment }</p>
      </div>
    ));

    return (
      <section>
        <form>
          <label htmlFor="emailInput">
            Email:
            <input
              type="email"
              name="emailInput"
              value={ emailInput }
              onChange={ this.handleChange }
              id="emailInput"
              data-testid="product-detail-email"
            />
          </label>
          <Rating event={ this.handleChange } avaliation={ 1 } />
          <Rating event={ this.handleChange } avaliation={ 2 } />
          <Rating event={ this.handleChange } avaliation={ 3 } />
          <Rating event={ this.handleChange } avaliation={ 4 } />
          <Rating event={ this.handleChange } avaliation={ 5 } />
          <label htmlFor="avaliationInput">
            Avaliação:
            <input
              type="text"
              name="avaliationInput"
              value={ avaliationInput }
              onChange={ this.handleChange }
              id="avaliationInput"
              data-testid="product-detail-evaluation"
            />
          </label>
          <button
            type="button"
            name="subimitBtn"
            onClick={ this.submit }
            data-testid="submit-review-btn"
          >
            Enviar
          </button>
        </form>
        { invalidForm && <div data-testid="error-msg">Campos inválidos</div> }
        <section>
          { avaliation.length !== 0 && commentsMap }
        </section>
      </section>
    );
  }
}

FormForProductsDetailed.propTypes = {
  id: PropTypes.string.isRequired,
};
