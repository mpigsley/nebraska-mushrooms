import * as React from 'react';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
  printable?: React.ReactNode;
  home?: boolean;
}

export default function PageLayout({ children, printable, home }: Props) {
  return (
    <main>
      <Header className="screen-only" home={home} />
      <div className="container page screen-only">{children}</div>
      <div id="printable">{printable}</div>
      <Footer className="screen-only" />
    </main>
  );
}
