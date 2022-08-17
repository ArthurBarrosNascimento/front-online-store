import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  render() {
    const { avaliation, event } = this.props;
    return (
      <label htmlFor={ avaliation }>
        {avaliation}
        <input
          type="radio"
          name="rating"
          value={ avaliation }
          id={ avaliation }
          onChange={ event }
          data-testid={ `${avaliation}-rating` }
        />
      </label>
    );
  }
}

Rating.propTypes = {
  avaliation: PropTypes.number.isRequired,
  event: PropTypes.func.isRequired,
};
