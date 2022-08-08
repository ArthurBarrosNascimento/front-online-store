import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class FilterCategories extends Component {
    state = {
      arrayOfCategories: [],
    }

    componentDidMount() {
      this.newGetCategories();
    }

    newGetCategories = async () => {
      const categoriesObject = await getCategories();
      this.setState({
        arrayOfCategories: categoriesObject,
      });
    }

    render() {
      const { arrayOfCategories } = this.state;
      const { handleChange } = this.props;
      const createCategories = arrayOfCategories.map(({ name, id }) => (
        <label key={ id } htmlFor={ id } data-testid="category">
          <input
            type="radio"
            name="categoryId"
            id={ id }
            value={ id }
            onChange={ handleChange }
          />
          { name }
        </label>
      ));

      return (
        <aside>{ createCategories }</aside>
      );
    }
}

export default FilterCategories;

FilterCategories.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
