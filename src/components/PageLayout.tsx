import * as React from 'react';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
  printable?: React.ReactNode;
}

export default function PageLayout({ children, printable }: Props) {
  return (
    <main>
      <Header className="screen-only" />
      <div className="container page screen-only">{children}</div>
      <div id="printable">{printable}</div>
      <Footer className="screen-only" />
    </main>
  );
}
