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
            NebraskaMushrooms.org is a product of the collaboration between multiple wildlife and educational organizations with a mission to promote the education, recreation, and conservation of fungi in the state of Nebraska. <Link to="/about">About Us</Link>
            </p>
            © Fungi Project {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
