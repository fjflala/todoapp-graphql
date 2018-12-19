/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
import './styles__small.scss';

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
        className={`ui-button ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}