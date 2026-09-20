import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import * as React from 'react';

import Footer from '../components/Footer';
import Seo from '../components/Seo';

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
            <h1 className="h2 noMargin">
              {data.markdownRemark?.frontmatter?.title}
            </h1>
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

export const Head: HeadFC<Queries.ArticleTemplateQuery> = ({
  data,
  location,
}) => {
  const frontmatter = data.markdownRemark?.frontmatter;
  return (
    <Seo
      pathname={location.pathname}
      title={frontmatter?.title}
      description={data.markdownRemark?.excerpt}
      type="article"
      jsonLd={{
        '@type': 'Article',
        headline: frontmatter?.title,
        datePublished: frontmatter?.date || undefined,
        author: frontmatter?.author
          ? { '@type': 'Person', name: frontmatter.author }
          : undefined,
      }}
    />
  );
};

export const pageQuery = graphql`
  query ArticleTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date
        author
      }
    }
  }
`;
