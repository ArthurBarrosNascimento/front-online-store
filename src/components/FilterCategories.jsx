import React, { Component } from 'react';
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
      console.log(categoriesObject);
      this.setState({
        arrayOfCategories: categoriesObject,
      });
    }

    render() {
      const { arrayOfCategories } = this.state;
      const createCategories = arrayOfCategories.map(({ name, id }) => (
        <label key={ id } htmlFor={ id } data-testid="category">
          <input type="radio" name="categoryName" value={ id } />
          { name }
        </label>
      ));

      return (
        <aside>{ createCategories }</aside>
      );
    }
}

export default FilterCategories;
