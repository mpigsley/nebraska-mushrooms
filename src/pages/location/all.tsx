import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationPage from '../../components/LocationPage';
import { type Species } from '../../utils/species.util';
import { type Tag } from '../../utils/tag.util';

export default function AllLocations({
  data,
}: Readonly<PageProps<Queries.AllLocationsQuery>>): JSX.Element | null {
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

  return <LocationPage title="All Nebraska Parks" species={species} />;
}

export const Head: HeadFC<Queries.AllLocationsQuery> = () => (
  <title>All Nebraska Parks</title>
);

export const pageQuery = graphql`
  query AllLocations {
    species: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "species" } } }
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
