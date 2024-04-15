import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationSpeciesList, { Tag } from '../components/LocationSpeciesList';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';

export default function LocationTemplate({
  data,
}: Readonly<PageProps<Queries.LocationTemplateQuery>>): JSX.Element {
  let geolocation: string | undefined;
  if (data.location?.frontmatter?.geolocation) {
    const { coordinates } = JSON.parse(
      data.location.frontmatter.geolocation,
    ) as { type: 'Point'; coordinates: [number, number] };
    geolocation = `${coordinates[1]},${coordinates[0]}`;
  }

  return (
    <PageLayout>
      <h3>
        {data.location?.frontmatter?.title}
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
    </PageLayout>
  );
}

export const Head: HeadFC<Queries.LocationTemplateQuery> = ({ data }) => (
  <title>{data.location?.frontmatter?.title} | Mushrooms of Nebraska</title>
);

export const pageQuery = graphql`
  query LocationTemplate($locationName: String!) {
    location: markdownRemark(frontmatter: { title: { eq: $locationName } }) {
      fields {
        slug
      }
      frontmatter {
        geolocation
        title
      }
    }
    species: allMarkdownRemark(
      filter: { frontmatter: { location: { eq: $locationName } } }
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
