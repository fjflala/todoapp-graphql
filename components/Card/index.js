/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
const styles = {
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    padding: '32px',
    boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)'
  }
};

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
      <article style={styles.card} className={className}>
        {children}
      </article>
    );
  }
}