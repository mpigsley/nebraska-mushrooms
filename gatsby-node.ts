import { createFilePath } from 'gatsby-source-filesystem';
import type { GatsbyNode } from 'gatsby';
import path from 'path';

export const createPages: GatsbyNode['createPages'] = ({
  actions: { createPage },
  graphql,
}) => {
  return graphql(`
    query SpeciesAndArticles {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { in: ["species", "article"] } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
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
            frontmatter: { templateKey: string };
          };
        }[];
      };
    };

    data.allMarkdownRemark.edges.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`,
        ),
        context: { id },
      });
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
