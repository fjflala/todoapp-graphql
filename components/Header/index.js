/**
 * Module dependencies
 */
import React, { PureComponent } from 'react';
import Search from '../Search';

/**
 * Styles
 */
import './styles__small.scss';

/**
 * Header Component
 */
export default class Header extends PureComponent {
  render() {
    return (
      <header className="ui-header">
        <div className="ui-header__container">
          <span className="ui-header__logo">TodoApp</span>
          <nav className="ui-header__nav">
            <Search />
          </nav>
        </div>
      </header>
    );
  }
}