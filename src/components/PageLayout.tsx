import * as React from 'react';

import Favicon from '../img/favicon.svg';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <main>
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
      <div className="container page">{children}</div>
      <Footer />
    </main>
  );
}
