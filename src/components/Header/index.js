/* global HOME_PATH */
import React from 'react';
import Link from 'gatsby-link';

import NavLogo from './components/NavLogo';
import UserState from './components/UserState';

import './header.css';

function Header() {
  return (
    <header>
      <nav id='top-nav'>
        <a className='home-link' href={HOME_PATH}>
          <NavLogo />
        </a>
        <ul id='top-right-nav'>
          <li>
            <Link to='/'>Curriculum</Link>
          </li>
          <li>
            <UserState />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
