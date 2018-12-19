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
        className="ui-select"
        style={style}
        placeholder={placeholder}
        onChange={onChange} 
      >
        {children}
      </select>
    );
  }
}
