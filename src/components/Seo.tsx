import { graphql, useStaticQuery } from 'gatsby';
import { getSrc, type IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';

const HOME_TAGLINE = 'Field Guide to Wild Mushrooms & Fungi';

type SiteQuery = {
  site: {
    siteMetadata: { title: string; siteUrl: string; description: string };
  };
};

type Props = {
  // `location.pathname` from the page's Head props
  pathname: string;
  // Page name without the site suffix. Omit on the home page.
  title?: string | null;
  description?: string | null;
  image?: IGatsbyImageData | null;
  type?: 'website' | 'article';
  noindex?: boolean;
  // schema.org object; `@context` is added automatically
  jsonLd?: Record<string, unknown>;
};

export default function Seo({
  pathname,
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: Props) {
  const { site } = useStaticQuery<SiteQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `);
  const { title: siteTitle, siteUrl, description: siteDescription } =
    site.siteMetadata;

  const fullTitle = title
    ? `${title} | ${siteTitle}`
    : `${siteTitle} | ${HOME_TAGLINE}`;
  const metaDescription = description || siteDescription;
  // Every page is served with a trailing slash, so the canonical matches it.
  const url = `${siteUrl}${pathname.endsWith('/') ? pathname : `${pathname}/`}`;
  // Social platforms only fetch absolute image URLs.
  const imageSrc = image ? getSrc(image) : undefined;
  const imageUrl = imageSrc ? `${siteUrl}${imageSrc}` : undefined;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && image && (
        <meta property="og:image:width" content={String(image.width)} />
      )}
      {imageUrl && image && (
        <meta property="og:image:height" content={String(image.height)} />
      )}

      <meta
        name="twitter:card"
        content={imageUrl ? 'summary_large_image' : 'summary'}
      />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...jsonLd,
          }).replace(/</g, '\\u003c')}
        </script>
      )}
    </>
  );
}
