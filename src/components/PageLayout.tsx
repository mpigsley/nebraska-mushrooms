import * as React from 'react';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <main>
      <Header />
      <div className="container page">{children}</div>
      <Footer />
    </main>
  );
}
