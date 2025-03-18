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
            templateKey: { in: ["species", "article", "location", "observation"] }
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
              locations
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
            observations?: string[];
            taxonomy: string[];
            templateKey: string;
            locations: string[];
            title?: string;
          };
        };
      }[];
    };
  };

  data.allMarkdownRemark.edges
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
    const observations = edge.node.frontmatter?.observations;

    let locationNames =
      edge.node.frontmatter.templateKey === 'location'
        ? [edge.node.frontmatter.title!]
        : undefined;

    if (!locationNames && edge.node.frontmatter.locations) {
      const locationNodes = data.allMarkdownRemark.edges.filter((e) =>
        edge.node.frontmatter.locations.includes(e.node.frontmatter.title!),
      );
      locationNames = locationNodes?.map(
        (locNode) => locNode.node.frontmatter.title!,
      );
    }

    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`,
      ),
      context: { id, locationNames, observations },
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
