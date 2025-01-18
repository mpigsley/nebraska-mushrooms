import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationSpeciesList from '../components/LocationSpeciesList';
import PageLayout from '../components/PageLayout';
import { type Tag } from '../utils/tag.util';

export default function LocationTemplate({
  data,
}: Readonly<PageProps<Queries.LocationTemplateQuery>>): JSX.Element {
  const firstLocation = data.locations.edges[0].node;

  let geolocation: string | undefined;
  if (firstLocation?.frontmatter?.geolocation) {
    const { coordinates } = JSON.parse(
      firstLocation.frontmatter.geolocation,
    ) as {
      type: 'Point';
      coordinates: [number, number];
    };
    geolocation = `${coordinates[1]},${coordinates[0]}`;
  }

  return (
    <PageLayout>
      <h3>
        {firstLocation?.frontmatter?.title}
        <a
          className="maps-link"
          href={`https://www.google.com/maps/place/${geolocation}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Map
        </a>
      </h3>
      <LocationSpeciesList
        species={data.species.edges.map((edge) => ({
          id: edge.node.id,
          slug: edge.node.fields?.slug ?? undefined,
          name: edge.node.frontmatter?.name ?? undefined,
          tags: (edge.node.frontmatter?.tags ?? []) as Tag[],
          locations: (edge.node.frontmatter?.locations as string[]) ?? [],
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
    </PageLayout>
  );
}

export const Head: HeadFC<Queries.LocationTemplateQuery> = ({ data }) => (
  <title>
    {data.locations.edges[0].node?.frontmatter?.title} | Mushrooms of Nebraska
  </title>
);

export const pageQuery = graphql`
  query LocationTemplate($locationNames: [String!]) {
    locations: allMarkdownRemark(
      filter: { frontmatter: { title: { in: $locationNames } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            geolocation
            title
          }
        }
      }
    }
    species: allMarkdownRemark(
      filter: { frontmatter: { locations: { in: $locationNames } } }
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
            locations
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
