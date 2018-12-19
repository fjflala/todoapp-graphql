/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
const styles = {
  textarea: {
    border: '1px solid #333',
    borderRadius: '2px',
    width: '100%',
    margin: '8px 0',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    fontSize: '16px',
    fontFamily: ' \'Raleway\', sans-serif',
  },
};

/**
 * Textarea Component
 */
export default class Textarea extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.any,
  }

  static defaultProps = {
    placeholder: '',
    className: '',
    onChange: () => {},
    defaultValue: '',
  }

  render() {
    const {
      children,
      placeholder,
      onChange,
      className,
      defaultValue,
    } = this.props;
    return (
      <textarea
        defaultValue={defaultValue}
        className={className}
        onChange={onChange}
        style={styles.textarea}
        placeholder={placeholder}
      />
    );
  }
}