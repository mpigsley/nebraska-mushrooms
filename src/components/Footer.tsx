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
              <b>Nebraska Mushrooms</b> is a collaboration of wildlife and educational groups promoting fungal education, recreation, and conservation in Nebraska.
            </p>
            <p>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="https://docs.google.com/forms/d/e/1FAIpQLSdZGuo3D7oGBCX9NQ_Hc9BjMkqByTOQlolRZs9cjVS-Peld9w/viewform">Contact</Link></li>
              </ul>
            </p>
            © Fungi Project {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
