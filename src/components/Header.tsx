import * as React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="container row">
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
    </header>
  );
}
