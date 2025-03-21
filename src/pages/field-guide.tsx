import { graphql, type PageProps } from 'gatsby';
import { Printer } from 'react-feather';
import * as React from 'react';

import PrintableSpeciesList from '../components/PrintableSpeciesList';
import ExampleFieldGuide from '../img/example-field-guide.webp';
import { type PrintableSpecies } from '../utils/species.util';
import PageLayout from '../components/PageLayout';

export default function FieldGuide({
  data,
}: Readonly<PageProps<Queries.FieldGuideQuery>>): JSX.Element {
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
    <PageLayout printable={<PrintableSpeciesList species={species} />}>
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
            >
              <Printer size={20} />
              <span className="ml-2">Print/Download Field Guide</span>
            </button>
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
