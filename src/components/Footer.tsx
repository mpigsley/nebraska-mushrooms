import * as React from 'react';

import { Link } from 'gatsby';
import clsx from 'clsx';

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={clsx('footer', className)}>
      <div className="container">
        <div className="row">
          <div>
            <p>
              <b>Nebraska Mushrooms</b> is a collaboration of wildlife and
              educational groups promoting fungal education, recreation, and
              conservation in Nebraska.
            </p>
            <div>
              <Link to="/about">About</Link>
              <span> | </span>
              <Link to="https://forms.gle/YNMvbkB85unjfWS48">
                Contact
              </Link>
              <span> | </span>© Fungi Project {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
