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
 * Header Component
 */
export default class Card extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <article className={`ui-card ${className}`}>
        {children}
      </article>
    );
  }
}