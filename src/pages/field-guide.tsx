import { Link } from 'gatsby';
import * as React from 'react';

import PageLayout from '../components/PageLayout';

export default function FieldGuide(): JSX.Element {
  return (
    <PageLayout>
      <div className="container">
        <div className="row">
          <h2>Offline Guide Download</h2>
          <p>
            The <b>Nebraska Mushrooms</b> guide is a full collection of
            species observed in Nebraska and catalogued on this website. Each
            species includes a common name (if available), scientific name, up
            to three images, and a description.
          </p>

          <ul>
            <li><a target="_blank" href="https://drive.google.com/file/d/12GYrT3JpbJ65pcB5UieeFrTP4cxTDN0N/view?usp=sharing">Full Version - April 2025</a> (257 pages, 390 Mb)</li>
            <li><a target="_blank" href="https://drive.google.com/file/d/1hN2ZhRHrzzMEeq6FmfVREE_qWk2ZMRkA/view?usp=sharing">Compressed Version - April 2025</a> (257 pages, 105 Mb)</li>
          </ul>

          <p>If you're interested in generating a current snapshot of all species profiles on the website to date, please use our <Link to="/generate-field-guide">guide generator</Link>. Note: a fast internet connection is recommended to access and use the generator.</p>
        </div>
      </div>
    </PageLayout>
  );
}
