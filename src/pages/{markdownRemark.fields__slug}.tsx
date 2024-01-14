import * as React from 'react';
import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';

export default function SpeciesProfileTemplate({
  data,
}: Readonly<PageProps<Queries.SpeciesProfileQuery>>): JSX.Element {
  return (
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
        <div
          className="eight columns"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark?.html ?? '' }}
        />
        <div className="four columns">
          <b>External Links</b>
          <ul>
            {data.markdownRemark?.frontmatter?.external_links?.map((item) => (
              <li key={item?.link}>
                <a href={item?.link ?? '/'} target="_blank" rel="noreferrer">
                  {item?.tag}
                </a>
              </li>
            ))}
          </ul>
          <b>Tags</b>
          <ul>
            {data.markdownRemark?.frontmatter?.tags?.map((item) => (
              <li key={item}>
                <i>{item}</i>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
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
      }
    }
  }
`;
