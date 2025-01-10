import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import * as React from 'react';

import TaxonomyBreadcrumbs from '../components/TaxonomyBreadcrumbs';
import Footer from '../components/Footer';

interface PageContext {
  taxon: string;
}

export default function TaxonTemplate({
  data,
  pageContext,
}: Readonly<PageProps<Queries.TaxonTemplateQuery, PageContext>>): JSX.Element {
  const firstItemsTaxonomy = (data.allMarkdownRemark.edges[0].node.frontmatter
    ?.taxonomy || []) as string[];
  const indexOfTaxon = firstItemsTaxonomy.indexOf(pageContext.taxon) + 1;
  const preTaxonomy = firstItemsTaxonomy.slice(0, indexOfTaxon);

  const iNatLink = (
    <a
      href={`http://www.inaturalist.org/taxa/search?q=${pageContext.taxon.toLowerCase().replaceAll(' ', '+')}`}
    >
      iNaturalist
    </a>
  );

  function buildTaxonomyTree(parentTaxa: string, level: number): JSX.Element {
    const taxaAtLevel = Array.from(
      data.allMarkdownRemark.edges
        .filter((edge) => {
          const { taxonomy } = edge.node.frontmatter!;
          if (!taxonomy) return false;
          return taxonomy[level - 1] === parentTaxa;
        })
        .reduce((acc, edge) => {
          const { taxonomy } = edge.node.frontmatter!;
          if (!taxonomy) return acc;
          const taxon = taxonomy[level];
          if (!taxon) return acc;
          return acc.add(taxon);
        }, new Set<string>()),
    ).sort();

    const speciesListAtLevel = data.allMarkdownRemark.edges
      .filter((edge) => {
        const { taxonomy } = edge.node.frontmatter!;
        if (!taxonomy) return false;
        return taxonomy[taxonomy.length - 1] === parentTaxa;
      })
      .map((species) => (
        <li key={species.node.frontmatter!.scientific_name}>
          <Link to={species.node.fields!.slug!}>
            {species.node.frontmatter!.name} (
            {species.node.frontmatter!.scientific_name})
          </Link>
        </li>
      ));

    return (
      <ul className="taxa-tree">
        {speciesListAtLevel}
        {taxaAtLevel.map((taxon) => {
          return (
            <li key={taxon}>
              {taxon}
              {buildTaxonomyTree(taxon, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <main className="container page">
        <Link to="/">&lt; Back to Home</Link>
        <h3 className="noMargin">{pageContext.taxon}</h3>
        <h5>
          {data.allMarkdownRemark.edges.length} species found - {iNatLink}
        </h5>
        <TaxonomyBreadcrumbs taxonomy={preTaxonomy} noLastLink />
        <hr />
        {buildTaxonomyTree(pageContext.taxon, indexOfTaxon)}
      </main>
      <Footer />
    </>
  );
}

export const Head: HeadFC<Queries.TaxonTemplateQuery, PageContext> = ({
  pageContext,
}) => <title>Taxon: {pageContext.taxon}</title>;

export const pageQuery = graphql`
  query TaxonTemplate($taxon: String!) {
    allMarkdownRemark(filter: { frontmatter: { taxonomy: { eq: $taxon } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            scientific_name
            taxonomy
          }
        }
      }
    }
  }
`;
