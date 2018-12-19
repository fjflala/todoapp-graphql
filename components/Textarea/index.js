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
        className={`ui-textarea ${className}`}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
}