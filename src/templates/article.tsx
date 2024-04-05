import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import * as React from 'react';

import Footer from '../components/Footer';

export default function ArticleTemplate({
  data,
}: Readonly<PageProps<Queries.ArticleTemplateQuery>>): JSX.Element {
  const formattedDate = !!data.markdownRemark?.frontmatter?.date
    ? new Date(data.markdownRemark.frontmatter.date).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      )
    : undefined;

  return (
    <>
      <main className="container page">
        <header className="row">
          <div className="one columns">&nbsp;</div>
          <div className="ten columns">
            <Link to="/">&lt; Back to Home</Link>
            <h2 className="noMargin">
              {data.markdownRemark?.frontmatter?.title}
            </h2>
            <p className="mt-2">
              {!!formattedDate && (
                <>
                  - <i>{formattedDate}</i>
                </>
              )}{' '}
              by <strong>{data.markdownRemark?.frontmatter?.author}</strong>
            </p>
            <hr />
          </div>
          <div className="one columns">&nbsp;</div>
        </header>
        <section className="row">
          <div className="one columns">&nbsp;</div>
          <div className="ten columns">
            <div
              dangerouslySetInnerHTML={{
                __html: data.markdownRemark?.html ?? '',
              }}
            />
          </div>
          <div className="one columns">&nbsp;</div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const Head: HeadFC<Queries.ArticleTemplateQuery> = ({ data }) => (
  <title>{data.markdownRemark?.frontmatter?.title}</title>
);

export const pageQuery = graphql`
  query ArticleTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        author
      }
    }
  }
`;
