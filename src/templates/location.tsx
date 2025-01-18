import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationPage from '../components/LocationPage';
import { type Species } from '../utils/species.util';
import { type Tag } from '../utils/tag.util';

export default function LocationTemplate({
  data,
}: Readonly<PageProps<Queries.LocationTemplateQuery>>): JSX.Element | null {
  const firstLocation = data.locations.edges[0].node;
  const locationTitle = firstLocation?.frontmatter?.title;
  if (!locationTitle) {
    return null;
  }

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

  const species: Species[] = data.species.edges.map((edge) => ({
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
  }));

  return (
    <LocationPage
      title={locationTitle}
      geolocation={geolocation}
      species={species}
    />
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
