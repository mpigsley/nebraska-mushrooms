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
      geolocation={firstLocation?.frontmatter?.geolocation || undefined}
      species={species}
      description={firstLocation?.frontmatter?.description || undefined}
    />
  );
}

export const Head: HeadFC<Queries.LocationTemplateQuery> = ({ data }) => {
  const firstLocation = data.locations.edges[0].node;
  const title = firstLocation?.frontmatter?.title || 'Nebraska';
  const description = `${title} Surveyed Mushroom List`;

  return (
    <>
      <title>{title} | Mushrooms of Nebraska</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta
        property="og:image"
        content={
          firstLocation.frontmatter?.heroImage?.childImageSharp?.gatsbyImageData
            ?.images?.fallback?.src || ''
        }
      />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
    </>
  );
};

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
            description
            heroImage {
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
