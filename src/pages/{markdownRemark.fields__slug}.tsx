import * as React from 'react';
import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

export default function SpeciesProfileTemplate({
  data,
}: Readonly<PageProps<Queries.SpeciesProfileQuery>>): JSX.Element {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="u-full-width relative">
        <div className="horizontalScroll u-full-width" ref={scrollRef}>
          {data.markdownRemark?.frontmatter?.photos?.map((item) => {
            if (item?.childImageSharp?.gatsbyImageData) {
              return (
                <GatsbyImage
                  className="horizontalScrollItem"
                  key={item?.childImageSharp?.id}
                  image={item?.childImageSharp?.gatsbyImageData}
                  alt={`${data.markdownRemark?.frontmatter?.name} (${data.markdownRemark?.frontmatter?.scientific_name})`}
                />
              );
            }
          })}
        </div>
        <button
          className="button-more-images"
          onClick={() => {
            scrollRef.current?.scrollTo({
              left: scrollRef.current?.scrollWidth,
              behavior: 'smooth',
            });
          }}
        >
          +{data.markdownRemark?.frontmatter?.photos?.length ?? 0} more photos
          &gt;
        </button>
      </div>
      <main className="container page">
        <section className="row">
          <Link to="/">&lt; Back to Home</Link>
          <h3 className="noMargin">{data.markdownRemark?.frontmatter?.name}</h3>
          <h5>{data.markdownRemark?.frontmatter?.scientific_name}</h5>
          <p>
            <i>{data.markdownRemark?.frontmatter?.taxonomy?.join(' > ')}</i>
          </p>
          <hr />
        </section>
        <section className="row">
          <div className="eight columns">
            <p
              dangerouslySetInnerHTML={{
                __html: data.markdownRemark?.html ?? '',
              }}
            />
            {!!data.markdownRemark?.frontmatter?.references?.length && (
              <>
                <b>References</b>
                {[...(data.markdownRemark?.frontmatter?.references ?? [])]
                  .sort()
                  .map((item) => (
                    <p key={item}>{item}</p>
                  ))}
              </>
            )}
          </div>

          <div className="four columns">
            {!!data.markdownRemark?.frontmatter?.external_links?.length && (
              <>
                <b>External Links</b>
                <ul>
                  {data.markdownRemark.frontmatter.external_links.map(
                    (item) => (
                      <li key={item?.link}>
                        <a
                          href={item?.link ?? '/'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item?.tag}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </>
            )}
            {!!data.markdownRemark?.frontmatter?.tags?.length && (
              <>
                <b>Tags</b>
                <ul>
                  {[...data.markdownRemark.frontmatter.tags]
                    .sort((a, b) => (a && b ? a.localeCompare(b) : 0))
                    .map((item) => (
                      <li key={item}>
                        <span className={`${item} tag`}>{item}</span>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export const Head: HeadFC<Queries.SpeciesProfileQuery> = ({ data }) => (
  <title>
    {data.markdownRemark?.frontmatter?.name} (
    {data.markdownRemark?.frontmatter?.scientific_name})
  </title>
);

export const pageQuery = graphql`
  query SpeciesProfile($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
