import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

export default function IndexPage({
  data,
}: Readonly<PageProps<Queries.AllSpeciesQuery>>): JSX.Element {
  return (
    <main className="container page">
      <h3 className="noMargin">Mushrooms of Nebraska</h3>
      <h5>Indian Cave State Park</h5>
      <b>Index:</b>
      <ul>
        {data.allMarkdownRemark.edges.map((edge) => (
          <li key={edge.node.id}>
            <a href={edge.node.fields?.slug ?? '#'}>
              {edge.node.frontmatter?.name} (
              {edge.node.frontmatter?.scientific_name})
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const Head: HeadFC<Queries.AllSpeciesQuery> = ({ data }) => (
  <title>Indian Cave State Park | Mushrooms of Nebraska</title>
);

export const query = graphql`
  query AllSpecies {
    allMarkdownRemark(
      filter: { frontmatter: { location: { eq: "Indian Cave State Park" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
            location
            scientific_name
          }
        }
      }
    }
  }
`;
