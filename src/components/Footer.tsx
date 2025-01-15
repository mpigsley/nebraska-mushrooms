import * as React from 'react';

import NebMyco from '../img/nebmyco.png';
import NebGP from '../img/nebgp.png';
import { Link } from 'gatsby';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div>
            <p>
              This website is a result of the collaboration between multiple wildlife and educational organizations to promote the education, recreation, and conservation fungi in the state of Nebraska. <Link to="/articles/about-us">About Us</Link>
            </p>
            © Fungi Project {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
