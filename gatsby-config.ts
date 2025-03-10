import type { GatsbyConfig } from 'gatsby';
import adapter from 'gatsby-adapter-netlify';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Nebraska Mushrooms',
    siteUrl: 'https://nebraskamushrooms.org',
    description: '',
  },
  graphqlTypegen: true,
  adapter: adapter(),
  plugins: [
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/cms/content`,
        name: 'cms',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 630 },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: { destinationDir: 'static' },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts-with-attributes',
      options: {
        fonts: ['Raleway:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600'],
        display: 'swap',
        attributes: {
          rel: 'stylesheet preload prefetch',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-decap-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-4DX2ZV0LF8'],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Mushrooms of Nebraska',
        short_name: 'NE Mushrooms',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#33c3f0',
        display: 'standalone',
        icon: 'src/img/favicon.svg',
      },
    },
  ],
};

export default config;
