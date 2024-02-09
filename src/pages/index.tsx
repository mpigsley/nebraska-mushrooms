import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationSpeciesList from '../components/LocationSpeciesList';

function stripHtml(html: string) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html;
  const result = tmp.textContent || tmp.innerText || '';
  tmp.remove();
  return result;
}

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

  const [filteredSpecies, setFilteredSpecies] = React.useState<
    {
      id: string;
      slug: string | undefined;
      name: string | undefined;
      location: string | undefined;
      scientificName: string | undefined;
      bodyText: string;
      photos: IGatsbyImageData[];
    }[]
  >([]);

  React.useEffect(() => {
    setFilteredSpecies(
      data.species.edges.map((edge) => ({
        id: edge.node.id,
        slug: edge.node.fields?.slug ?? undefined,
        name: edge.node.frontmatter?.name ?? undefined,
        location: edge.node.frontmatter?.location ?? undefined,
        scientificName: edge.node.frontmatter?.scientific_name ?? undefined,
        bodyText: stripHtml(edge.node.html ?? ''),
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
      })),
    );
  }, [data.species.edges]);

  return (
    <main className="container page">
      <h3 className="noMargin">Mushrooms of Nebraska</h3>
      <a
        href={`https://www.google.com/maps/place/${geolocation}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h5>{data.location?.frontmatter?.title}</h5>
      </a>
      <LocationSpeciesList species={filteredSpecies} />
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
          html
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
