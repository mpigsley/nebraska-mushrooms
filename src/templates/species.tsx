import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import TaxonomyBreadcrumbs from '../components/TaxonomyBreadcrumbs';
import { type Tag, getTagClass } from '../utils/tag.util';
import Footer from '../components/Footer';
import References from '../components/References';

export default function SpeciesProfileTemplate({
  data,
}: Readonly<PageProps<Queries.SpeciesProfileTemplateQuery>>): JSX.Element {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const commonName = data.species?.frontmatter?.name;
  const scientificName = data.species?.frontmatter?.scientific_name;
  const numPhotos = data.species?.frontmatter?.photos?.length ?? 0;

  let locationSlug = '/location/all/';
  if (data.locations.edges.length === 1) {
    locationSlug = data.locations.edges[0]?.node.fields?.slug ?? locationSlug;
  }

  const getSlideshowScroll = (): number => {
    const increment = scrollRef.current?.clientWidth || 0;
    const totalSpace = scrollRef.current?.scrollWidth || 0;
    const currentPosition = scrollRef.current?.scrollLeft || 0;
    const nextPostion = increment + currentPosition;
    return nextPostion >= totalSpace ? 0 : nextPostion;
  }

  const speciesPhotos = [...(data.species?.frontmatter?.photos ?? [])].filter(Boolean);
  const observationPhotos = data.observations?.edges.flatMap(obs => [...(obs.node.frontmatter?.photos ?? [])]).filter(Boolean) ?? [];
  const allPhotos = [...speciesPhotos, ...observationPhotos];

  return (
    <>
      <div className="u-full-width relative">
        <div className="horizontalScroll u-full-width" ref={scrollRef}>
          {allPhotos?.map((item) => {
            if (item?.childImageSharp?.gatsbyImageData) {
              return (
                <GatsbyImage
                  className="horizontalScrollItem"
                  key={item?.childImageSharp?.id}
                  image={item?.childImageSharp?.gatsbyImageData}
                  alt={`${data.species?.frontmatter?.name} (${data.species?.frontmatter?.scientific_name})`}
                />
              );
            }
          })}
        </div>
        {numPhotos > 3 && (
          <button
            className="button-more-images"
            onClick={() => {
              scrollRef.current?.scrollTo({
                left: getSlideshowScroll(),
                behavior: 'smooth',
              });
            }}
          >
            +{numPhotos} more photos &gt;
          </button>
        )}
      </div>
      <main className="container page">
        <section className="row">
          <Link to={'/'}>
            &lt; Back to Home
          </Link>
          <h3 className={`noMargin ${!!!commonName && 'italic-text'}`}>{commonName || scientificName}</h3>
          {commonName && <h5 className='italic-text'>{scientificName}</h5>}
          <p>
            {data.species?.frontmatter?.taxonomy && (
              <TaxonomyBreadcrumbs
                taxonomy={data.species?.frontmatter?.taxonomy as string[]}
              />
            )}
          </p>
          <hr />
        </section>
        <section className="row">
          <div className="eight columns">
            <div
              dangerouslySetInnerHTML={{
                __html: data.species?.html ?? '',
              }}
            />
            {data.observations?.edges.length > 0 && (
              <>
                <hr />
                <h4>Observations</h4>
                {data.observations.edges.map((observation) => (
                  <div key={observation.node.id}>
                    <h5><a href={observation.node?.frontmatter?.uri ?? '#'}>{`${observation.node?.frontmatter?.date_pretty} ${observation.node?.frontmatter?.location}`}</a></h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: observation.node?.html ?? '',
                      }}
                    />
                    {!!observation.node?.frontmatter?.dna_barcode_its && (
                      <>
                        DNA Barcode ITS:
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                          {observation.node?.frontmatter?.dna_barcode_its}
                        </pre>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
            {!!data.species?.frontmatter?.references?.length
              && (
                <>
                  <hr />
                  <References references={data.species?.frontmatter?.references as string[]} />
                </>
              )}
          </div>

          <div className="four columns">
            {!!data.locations.edges.length && (
              <>
                <b>Locations</b>
                <ul>
                  {data.locations.edges.map((locationEdge) => (
                    <li key={locationEdge.node.fields?.slug}>
                      <a
                        href={locationEdge.node.fields?.slug ?? '/location/all'}
                      >
                        {locationEdge.node.frontmatter?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!!data.species?.frontmatter?.external_links?.length && (
              <>
                <b>External Links</b>
                <ul>
                  {data.species.frontmatter.external_links.map((item) => (
                    <li key={item?.link}>
                      <a
                        href={item?.link ?? '/'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item?.tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!!data.species?.frontmatter?.tags?.length && (
              <>
                <b>Tags</b>
                <ul>
                  {[...data.species.frontmatter.tags]
                    .sort((a, b) => (a && b ? a.localeCompare(b) : 0))
                    .map((item) => (
                      <li key={item}>
                        <Link to={`${locationSlug}?t=${item}`}>
                          <span className={`${getTagClass(item as Tag)} tag`}>
                            {item}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const Head: HeadFC<Queries.SpeciesProfileTemplateQuery> = ({ data }) => {
  const prettyName = !!data.species?.frontmatter?.name
    ? `${data.species?.frontmatter?.name} (${data.species?.frontmatter?.scientific_name})`
    : data.species?.frontmatter?.scientific_name;
  return (
    <>
      <title>
        {data.species?.frontmatter?.name} (
        {data.species?.frontmatter?.scientific_name}) | Mushrooms of Nebraska
      </title>
      <meta property="og:title" content={prettyName || ''} />
      <meta property="og:description" content="Mushrooms of Nebraska" />
      <meta name="description" content="Mushrooms of Nebraska" />
      <meta
        property="og:image"
        content={
          data.species?.frontmatter?.photos?.[0]?.childImageSharp
            ?.gatsbyImageData?.images?.fallback?.src || ''
        }
      />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
    </>
  );
};

export const pageQuery = graphql`
  query SpeciesProfileTemplate($id: String!, $locationNames: [String!], $observations: [String!] = []) {
    locations: allMarkdownRemark(
      filter: { frontmatter: { title: { in: $locationNames } } }
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
    species: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        scientific_name
        taxonomy
        tags
        external_links {
          link
          tag
        }
        references
        photos {
          childImageSharp {
            id
            gatsbyImageData(height: 480, quality: 90, layout: CONSTRAINED)
          }
        }
      }
    }
    observations: allMarkdownRemark(
      filter: { 
        frontmatter: { 
          inat_id: { in: $observations },
          templateKey: { eq: "observation" }
        } 
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
            location
            date_pretty
            uri
            photos {
              childImageSharp {
                id
                gatsbyImageData(height: 480, quality: 90, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
