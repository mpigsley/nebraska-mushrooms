import * as React from 'react';

import NebMyco from '../img/nebmyco.png';
import NebGP from '../img/nebgp.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="six columns">
            <p>
              Developed in collaboration with the Nebraska Game and Parks
              Commission, Fungi Project, and Nebraska Mycological Society.
            </p>
            <p>© Fungi Project {new Date().getFullYear()}</p>
          </div>
          <div className="six columns">
            <p>
              <div>
                <a
                  className="footer-link"
                  href="https://www.nebmyco.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={NebMyco}
                    alt="Nebraska Mycological Society"
                    width="50"
                    height="50"
                  />
                  <span className="footer-link-text">
                    Nebraska Mycological Society
                  </span>
                </a>
                <a
                  className="footer-link"
                  href="https://www.outdoornebraska.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={NebGP}
                    alt="Nebraska Game and Parks"
                    width="50"
                    height="50"
                  />
                  <span className="footer-link-text">
                    Nebraska Game and Parks
                  </span>
                </a>
              </div>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
