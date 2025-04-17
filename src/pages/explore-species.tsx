import { type PageProps, graphql, type HeadFC } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';

import { type Tag } from '../utils/tag.util';
import SpeciesPage from '../components/SpeciesPage';

interface ExploreSpeciesPageProps extends PageProps<Queries.ExploreSpeciesQuery> {}

export default function ExploreSpecies({ data }: Readonly<ExploreSpeciesPageProps>) {
  const speciesList = data.species.edges.map((edge) => edge.node);
  const allObservations = data.observations.edges.map((edge) => edge.node);
  const allLocations = data.locations.edges.map((edge) => edge.node);

  const [currentIndex, setCurrentIndex] = React.useState(
    Math.floor(Math.random() * speciesList.length)
  );
  const [secondsLeft, setSecondsLeft] = React.useState(120);

  const setRandomIndex = () => {
    setCurrentIndex(Math.floor(Math.random() * speciesList.length));
    setSecondsLeft(120);
  };

  React.useEffect(() => {
    const speciesInterval = setInterval(() => {
      setRandomIndex();
    }, 2 * 60 * 1000); // 2 minutes

    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(speciesInterval);
      clearInterval(countdownInterval);
    };
  }, [speciesList.length]);

  const currentSpecies = speciesList[currentIndex];

  const matchingObservations = allObservations.filter(
    (obs) =>
      obs.frontmatter?.scientific_name &&
      obs.frontmatter.scientific_name === currentSpecies.frontmatter?.scientific_name
  );

  const normalize = (s: string) => s.trim().toLowerCase();

  const matchingLocationTitles = new Set(
    matchingObservations
      .map((obs) => obs.frontmatter?.location)
      .filter((location): location is string => Boolean(location))
      .map(normalize)
  );

  const matchingLocations = allLocations.filter((loc) =>
    loc.frontmatter?.title && matchingLocationTitles.has(normalize(loc.frontmatter.title))
  );

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <span>
          {minutes}:{seconds.toString().padStart(2, '0')} until next species
        </span>
        <button
          onClick={setRandomIndex}
          style={{
            backgroundColor: 'lightgray',
            color: 'black',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      <SpeciesPage
        species={{
          id: currentSpecies.id,
          bodyHtml: currentSpecies.html ?? '',
          name: currentSpecies.frontmatter?.name ?? undefined,
          scientificName: currentSpecies.frontmatter?.scientific_name ?? '',
          taxonomy: [],
          tags: (currentSpecies.frontmatter?.tags?.filter(Boolean) as Tag[]) ?? [],
          externalLinks: [],
          references: [],
          photos:
            (currentSpecies.frontmatter?.photos
              ?.map((p) => p?.childImageSharp?.gatsbyImageData)
              .filter(Boolean) as IGatsbyImageData[]) ?? [],
        }}
        observations={matchingObservations.map((o) => ({
          id: o.id,
          html: o.html ?? '',
          inatId: o.frontmatter?.inat_id ?? '',
          name: o.frontmatter?.name ?? '',
          scientificName: o.frontmatter?.scientific_name ?? '',
          dnaBarcodeIts: o.frontmatter?.dna_barcode_its ?? '',
          mycomapBlastLink: o.frontmatter?.mycomap_blast_link ?? '',
          location: o.frontmatter?.location ?? '',
          datePretty: o.frontmatter?.date_pretty ?? '',
          uri: o.frontmatter?.uri ?? '',
          photos:
            (o.frontmatter?.photos
              ?.map((p) => p?.childImageSharp?.gatsbyImageData)
              .filter(Boolean) as IGatsbyImageData[]) ?? [],
        }))}
        locations={matchingLocations.map((l) => ({
          slug: l.fields?.slug ?? '',
          title: l.frontmatter?.title ?? '',
        }))}
      />
    </div>
  );
}

export const Head: HeadFC<Queries.ExploreSpeciesQuery> = () => (
  <>
    <title>Explore Species | Mushrooms of Nebraska</title>
    <meta
      name="description"
      content="Explore a new mushroom species every 5 minutes, randomly selected from our database."
    />
  </>
);

export const query = graphql`
  query ExploreSpecies {
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
            scientific_name
            tags
            photos {
              childImageSharp {
                id
                gatsbyImageData(
                  quality: 90
                  height: 300
                  width: 468
                  layout: CONSTRAINED
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
    }
    observations: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "observation" } }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            inat_id
            name
            scientific_name
            dna_barcode_its
            mycomap_blast_link
            location
            date_pretty
            uri
            photos {
              childImageSharp {
                id
                gatsbyImageData(
                  height: 480
                  quality: 90
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
    locations: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "location" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;