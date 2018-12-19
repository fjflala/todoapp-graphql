/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
const styles = {
  select: {
    border: '1px solid #333',
    borderRadius: '2px',
    width: '100%',
    margin: '0 0 8px',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    fontSize: '16px',
    fontFamily: ' \'Raleway\', sans-serif',
  },
};

/**
 * Select component
 */
export default class Select extends PureComponent {
  static propTypes = {
    style: PropTypes.shape(),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }

  static propTypes = {
    style: {},
    onChange: () => {},
    placeholder: '',
  }

  render() {
    const {
      style,
      onChange,
      placeholder,
      children,
    } = this.props;
    return (
      <select
        style={Object.assign({}, styles.select, style)}
        placeholder={placeholder}
        onChange={onChange} 
      >
        {children}
      </select>
    );
  }
}
