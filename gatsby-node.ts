import { createFilePath } from 'gatsby-source-filesystem';
import type { GatsbyNode } from 'gatsby';
import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
  graphql,
}) => {
  const result = await graphql(`
    query SpeciesAndArticles {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { in: ["species", "article", "location"] }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              location
              taxonomy
              templateKey
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach((e: { toString: () => void }) =>
      console.error(e.toString()),
    );
    return Promise.reject(result.errors);
  }

  const data = result.data as {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          fields: { slug: string };
          frontmatter: {
            taxonomy: string[];
            templateKey: string;
            location?: string;
            title?: string;
          };
        };
      }[];
    };
  };

  const allTaxa = data.allMarkdownRemark.edges
    .filter((edge) => edge.node.frontmatter.taxonomy)
    .reduce((uniqSet, edge) => {
      edge.node.frontmatter.taxonomy.forEach((t) => uniqSet.add(t));
      return uniqSet;
    }, new Set<string>())
    .forEach((taxon) => {
      createPage({
        path: `/taxa/${taxon.toLowerCase()}`,
        component: path.resolve('src/templates/taxon.tsx'),
        context: { taxon },
      });
    });

  data.allMarkdownRemark.edges.forEach((edge) => {
    const id = edge.node.id;

    let locationName =
      edge.node.frontmatter.templateKey === 'location'
        ? edge.node.frontmatter.title
        : undefined;

    if (!locationName && edge.node.frontmatter.location) {
      const locationNode = data.allMarkdownRemark.edges.find(
        (e) => e.node.frontmatter.title === edge.node.frontmatter.location,
      );
      locationName = locationNode?.node.frontmatter.title;
    }

    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`,
      ),
      context: { id, locationName },
    });
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({ name: 'slug', node, value });
  }
};
