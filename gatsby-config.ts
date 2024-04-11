import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Nebraska Mushrooms',
    siteUrl: 'https://nebraskamushrooms.org',
    description: '',
  },
  graphqlTypegen: true,
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
            options: { maxWidth: 2048 },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: { destinationDir: 'static' },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Raleway:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-4DX2ZV0LF8",
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};

export default config;
