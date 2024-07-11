import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { type Tag, getTagClass } from '../utils/tag.util';
import Footer from '../components/Footer';

export default function SpeciesProfileTemplate({
  data,
}: Readonly<PageProps<Queries.SpeciesProfileTemplateQuery>>): JSX.Element {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const commonName = data.species?.frontmatter?.name;
  const scientificName = data.species?.frontmatter?.scientific_name;
  const numPhotos = data.species?.frontmatter?.photos?.length ?? 0;

  return (
    <>
      <div className="u-full-width relative">
        <div className="horizontalScroll u-full-width" ref={scrollRef}>
          {data.species?.frontmatter?.photos?.map((item) => {
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
                left: scrollRef.current?.scrollWidth,
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
          <Link to={data.location?.fields?.slug ?? '/'}>
            &lt; Back to {data.location?.frontmatter?.title ?? 'Home'}
          </Link>
          <h3 className="noMargin">{commonName || scientificName}</h3>
          {commonName && <h5>{scientificName}</h5>}
          <p>
            {data.species?.frontmatter?.taxonomy?.map((taxa, index: number) => (
              <i>
              {index > 0 && (<> &gt; </>)}
              <a href={`http://www.inaturalist.org/taxa/search?q=${taxa?.toLowerCase().replaceAll(' ', '+')}`}>
                {taxa}
              </a>
              </i>
            ))}
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
            {!!data.species?.frontmatter?.references?.length && (
              <>
                <h4>References</h4>
                {[...(data.species?.frontmatter?.references ?? [])]
                  .sort()
                  .map((item) => (
                    <p key={item}>{item}</p>
                  ))}
              </>
            )}
          </div>

          <div className="four columns">
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
                        <span className={`${getTagClass(item as Tag)} tag`}>
                          {item}
                        </span>
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

export const Head: HeadFC<Queries.SpeciesProfileTemplateQuery> = ({ data }) => (
  <title>
    {data.species?.frontmatter?.name} (
    {data.species?.frontmatter?.scientific_name}) | Mushrooms of Nebraska
  </title>
);

export const pageQuery = graphql`
  query SpeciesProfileTemplate($id: String!, $locationName: String!) {
    location: markdownRemark(frontmatter: { title: { eq: $locationName } }) {
      fields {
        slug
      }
      frontmatter {
        title
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
  }
`;
