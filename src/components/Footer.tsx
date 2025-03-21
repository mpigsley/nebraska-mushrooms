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
              <Link to="https://docs.google.com/forms/d/e/1FAIpQLSdZGuo3D7oGBCX9NQ_Hc9BjMkqByTOQlolRZs9cjVS-Peld9w/viewform">
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
