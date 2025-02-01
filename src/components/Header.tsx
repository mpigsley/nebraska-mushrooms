import * as React from 'react';

import Favicon from '../img/favicon.svg';
import { Link } from 'gatsby';

export default function Header() {
  return (
    <header className="header">
      <div className="container row flex items-center">
        <Link to="/">
          <img src={Favicon} className="logo action-button" />
        </Link>
        <div>
          <a href="/" className="header-title-link">
            <h5 className="noMargin">Mushrooms of Nebraska</h5>
          </a>
          <p className="noMargin">
            Important! Please read our{' '}
            <a href="/articles/concerning-wild-mushroom-edibility/">
              disclaimer on edibility.
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
