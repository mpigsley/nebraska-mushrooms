import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationSpeciesList, { Tag } from '../components/LocationSpeciesList';
import Footer from '../components/Footer';

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
    <>
      <main className="container page">
        <h3 className="noMargin" style={{ textAlign: 'center' }}>
          Mushrooms of Nebraska
          <hr />
        </h3>
        <p>
          Important! Please read our{' '}
          <a href="/articles/concerning-wild-mushroom-edibility/">
            disclaimer on edibility
          </a>
          .
        </p>
        <a
          href={`https://www.google.com/maps/place/${geolocation}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>{data.location?.frontmatter?.title}</h5>
        </a>
        <LocationSpeciesList
          species={data.species.edges.map((edge) => ({
            id: edge.node.id,
            slug: edge.node.fields?.slug ?? undefined,
            name: edge.node.frontmatter?.name ?? undefined,
            tags: (edge.node.frontmatter?.tags ?? []) as Tag[],
            location: edge.node.frontmatter?.location ?? undefined,
            scientificName: edge.node.frontmatter?.scientific_name ?? undefined,
            bodyHtml: edge.node.html ?? '',
            photos:
              edge.node.frontmatter?.photos?.reduce(
                (acc: IGatsbyImageData[], photo) => {
                  if (photo?.childImageSharp) {
                    const gatsbyImageData = getImage(
                      photo.childImageSharp.gatsbyImageData,
                    );
                    if (gatsbyImageData) {
                      acc.push(gatsbyImageData);
                    }
                  }
                  return acc;
                },
                [],
              ) ?? [],
          }))}
        />
      </main>
      <Footer />
    </>
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
          html
          fields {
            slug
          }
          frontmatter {
            name
            location
            scientific_name
            tags
            photos {
              childImageSharp {
                id
                gatsbyImageData(
                  height: 235
                  width: 235
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
