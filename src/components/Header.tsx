import * as React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';

import Favicon from '../img/favicon.svg';

export default function Header({
  className,
  home = false,
}: {
  className?: string;
  // On the home page the site name is the page's <h1>.
  home?: boolean;
}) {
  const Title = home ? 'h1' : 'h5';
  return (
    <header className={clsx('header', className)}>
      <div className="container row flex items-center">
        <Link to="/">
          <img
            src={Favicon}
            className="logo action-button"
            alt="Mushrooms of Nebraska home"
          />
        </Link>
        <div>
          <a href="/" className="header-title-link">
            <Title className="h5 noMargin">Mushrooms of Nebraska</Title>
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
