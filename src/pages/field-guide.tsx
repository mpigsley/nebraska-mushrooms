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
            The <b>Nebraska Mushrooms</b> field guide is a full collection of
            species observed in Nebraska and catalogued on this website. Each
            species includes a common name (if available), scientific name, up
            to three images, and a description.
          </p>

          <h3>Snapshots</h3>
          <ul>
            <li><a target="_blank" href="/pdf/Beta-April-2025.pdf">Beta April 2025</a> (240 pages, 112mb)</li>
          </ul>

          <p>If you're interested in generating a current snapshot of all species profiles on the website to date, please use our <Link to="/generate-field-guide">generator</Link>. Note: a fast internet connection is recommended to access and use the generator.</p>
        </div>
      </div>
    </PageLayout>
  );
}
