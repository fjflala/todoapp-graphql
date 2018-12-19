/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
const styles = {
  button: {
    border: 0,
    backgroundColor: '#333',
    padding: '8px 16px',
    boxSizing: 'border-box',
    color: 'white',
    borderRadius: '4px',
    fontSize: '18px',
  },
};

/**
 * Button Component
 */
export default class Button extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    onClick: () => {},
    className: '',
  }

  render() {
    const {
      children,
      onClick,
      className,
    } = this.props;
    return (
      <button
        className={className}
        onClick={onClick}
        style={styles.button}
      >
        {children}
      </button>
    );
  }
}