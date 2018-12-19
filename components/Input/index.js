/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
const styles = {
  input: {
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
 * Input Component
 */
export default class Input extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    placeholder: '',
    type: 'text',
    className: '',
    defaultValue: '',
    onChange: () => {},
  }

  render() {
    const {
      children,
      placeholder,
      onChange,
      type,
      className,
      defaultValue,
    } = this.props;
    return (
      <input
        defaultValue={defaultValue}
        onChange={onChange}
        type={type}
        className={className}
        style={styles.input}
        placeholder={placeholder} 
      />
    );
  }
}