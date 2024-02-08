import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';
import LocationSpeciesList from '../components/LocationSpeciesList';
import { getImage } from 'gatsby-plugin-image';

export default function IndexPage({
  data,
}: Readonly<PageProps<Queries.LocationIndexQuery>>): JSX.Element {
  let geolocation: string | undefined;
  if (data.location?.frontmatter?.geolocation) {
    const { coordinates } = JSON.parse(
      data.location.frontmatter.geolocation,
    ) as { type: 'Point'; coordinates: [number, number] };
    geolocation = `${coordinates[1]},${coordinates[0]}`;
  }
  return (
    <main className="container page">
      <h3 className="noMargin">Mushrooms of Nebraska</h3>
      <h5>{data.location?.frontmatter?.title}</h5>
      <p>
        <i>
          <a
            href={`https://www.google.com/maps/place/${geolocation}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </i>
      </p>
      <hr />
      <LocationSpeciesList
        species={data.species.edges.map((edge) => ({
          id: edge.node.id,
          slug: edge.node.fields?.slug ?? undefined,
          name: edge.node.frontmatter?.name ?? undefined,
          location: edge.node.frontmatter?.location ?? undefined,
          scientificName: edge.node.frontmatter?.scientific_name ?? undefined,
          photos: edge.node.frontmatter?.photos?.map((photo) =>
            getImage(photo?.childImageSharp ?? null),
          ),
        }))}
      />
    </main>
  );
}

export const Head: HeadFC<Queries.LocationIndexQuery> = ({ data }) => (
  <title>{data.location?.frontmatter?.title} | Mushrooms of Nebraska</title>
);

// add another allMarkdownRemark query
export const query = graphql`
  query LocationIndex {
    location: markdownRemark(
      frontmatter: { title: { eq: "Indian Cave State Park" } }
    ) {
      frontmatter {
        geolocation
        title
      }
    }
    species: allMarkdownRemark(
      filter: { frontmatter: { location: { eq: "Indian Cave State Park" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
            location
            scientific_name
            photos {
              childImageSharp {
                id
                gatsbyImageData(
                  height: 50
                  width: 50
                  quality: 90
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`;
