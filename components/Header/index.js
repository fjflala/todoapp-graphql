/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import Search from '../Search';

/**
 * Styles
 */
const styles = {
  header: {
    borderBottom: '1px solid #333',
    position: 'relative',
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: '16px',
    maxWidth: '1024px',
    margin: '0 auto',
    position: 'relative',
  },
  logo: {
    fontWeight: 900,
    fontSize: '18px',
  },
  nav: {
    position: 'absolute',
    right: '16px',
    left: '100px',
    top: 0,
    bottom: 0,
    padding: '10px 0',
  },
  button: {
    border: 0,
    backgroundColor: '#333',
    padding: '8px 16px',
    boxSizing: 'border-box',
    color: 'white',
    borderRadius: '4px',
    position: 'absolute',
    right: '16px',
  }
};

/**
 * Header Component
 */
export default class Header extends PureComponent {
  render() {
    return (
      <header style={styles.header}>
        <div style={styles.container}>
          <span style={styles.logo}>TodoApp</span>
          <nav style={styles.nav}>
            <Search />
          </nav>
        </div>
      </header>
    );
  }
}