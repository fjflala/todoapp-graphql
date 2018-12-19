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
        className={`ui-input ${className}`}
        placeholder={placeholder} 
      />
    );
  }
}