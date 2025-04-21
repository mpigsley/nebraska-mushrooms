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
              <b>Nebraska Mushrooms</b> is a collaboration of wildlife groups
              with a mission to promote the education, recreation, and
              conservation of fungi in Nebraska.
            </p>
            <div>
              <Link to="/field-guide">Offline Guide</Link>
              <span> | </span>
              <Link to="/about">About</Link>
              <span> | </span>
              <Link to="https://forms.gle/YNMvbkB85unjfWS48">Contact</Link>
              <span> | </span>© Fungi Project {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
