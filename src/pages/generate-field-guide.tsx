import { graphql, Link, type PageProps } from 'gatsby';
import { Printer, Loader } from 'react-feather';
import * as React from 'react';

import ExampleFieldGuide from '../img/example-field-guide.webp';
import { type PrintableSpecies } from '../utils/species.util';
import PageLayout from '../components/PageLayout';

const PrintableSpeciesList = React.lazy(() => import('../components/PrintableSpeciesList'));

const SpinnerIcon = () => (
  <Loader
    size={20}
    className="spin"
    style={{ verticalAlign: 'middle' }}
  />
);

export default function FieldGuide({
  data,
}: Readonly<PageProps<Queries.FieldGuideQuery>>): JSX.Element {
  const [printableReady, setPrintableReady] = React.useState(false);

  const species: PrintableSpecies[] = data.species.edges.map((edge) => ({
    id: edge.node.id,
    name: edge.node.frontmatter?.name ?? undefined,
    scientificName: edge.node.frontmatter?.scientific_name ?? undefined,
    bodyHtml: edge.node.html ?? '',
    photos:
      edge.node.frontmatter?.photos
        ?.slice(0, 3)
        .reduce((acc: { data: string; width: number }[], photo) => {
          if (photo?.childImageSharp) {
            const {
              base64: data,
              height,
              width,
            } = photo.childImageSharp.fixed ?? {};
            if (data && height && width) {
              acc.push({ data, width: Math.round(400 * (width / height)) });
            }
          }
          return acc;
        }, []) ?? [],
  }));

  return (
    <PageLayout
      printable={
        <React.Suspense
          fallback={<p>Loading printable field guide...</p>}
        >
          <PrintableSpeciesList
            species={species}
            onReady={() => setPrintableReady(true)}
          />
        </React.Suspense>
      }
    >
      <div className="container">
        <div className="row">
          <h2>Field Guide</h2>
          <p>
            The <b>Nebraska Mushrooms</b> field guide is a full collection of
            species observed in Nebraska and catalogued on this website. Each
            species includes a common name (if available), scientific name, up
            to three images, and a description. See the example field guide page
            below.
          </p>

          <p>
            The field guide is designed to be printed or downloaded through the
            browser's print dialog. If you want to save the field guide as a
            PDF, select the "Save as PDF" destination option in the print
            dialog. To begin, click the print button below.
          </p>

          <p>
            <button
              className="button-primary button-icon mb-0"
              title="Print PDF"
              onClick={() => window.print()}
              disabled={!printableReady}
            >
              {printableReady ? <Printer size={20} /> : <SpinnerIcon />}
              <span className="ml-2">
                {printableReady ? 'Print/Download Field Guide' : 'Loading, please wait...'}
              </span>
            </button>
          </p>

          <p>
            <b>Heads up</b>: This file is quite large and might take a moment to load, especially on slower internet connections. If you're interested in an easier download, consider downloading a past <Link to="/field-guide">snapshot</Link>.
          </p>

          <hr />

          <p>
            <img
              className="u-full-width"
              src={ExampleFieldGuide}
              alt="Example field guide"
            />
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export const query = graphql`
  query FieldGuide {
    species: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "species" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            name
            scientific_name
            photos {
              childImageSharp {
                id
                fixed(base64Width: 500) {
                  base64
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
