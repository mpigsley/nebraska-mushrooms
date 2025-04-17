import { type PageProps, graphql, Link, type HeadFC } from 'gatsby';
import * as React from 'react';

import TaxonomyBreadcrumbs from '../components/TaxonomyBreadcrumbs';
import Footer from '../components/Footer';
import { generateTaxaRank } from '../utils/taxon-service';
import { GatsbyImage } from 'gatsby-plugin-image';
import References from '../components/References';

interface PageContext {
  taxon: string;
}

export default function TaxonTemplate({
  data,
  pageContext,
}: Readonly<PageProps<Queries.TaxonTemplateQuery, PageContext>>): JSX.Element {
  const [search, setSearch] = React.useState('');

  const firstItemsTaxonomy = (data.taxa.edges[0].node.frontmatter
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

  function isMatchOrDescendantMatch(taxon: string): boolean {
    const lower = search.toLowerCase();
    return data.taxa.edges.some((edge) => {
      const { taxonomy, scientific_name, name } = edge.node.frontmatter!;
      const taxonMatch = taxonomy?.includes(taxon);
      const str = `${scientific_name} ${name ?? ''} ${taxonomy?.join(' ')}`.toLowerCase();
      return taxonMatch && str.includes(lower);
    });
  }

  const topSpeciesPhotos = data.taxa.edges
    .filter((edge) => {
      if (!search) return true;
      const { scientific_name, name, taxonomy } = edge.node.frontmatter!;
      const str = `${scientific_name} ${name ?? ''} ${taxonomy?.join(' ')}`.toLowerCase();
      return str.includes(search.toLowerCase());
    })
    .map((edge) => {
      const firstImage = edge.node.frontmatter?.photos?.[0]!;
      return (
        <div className="taxon-card" key={edge.node.frontmatter!.scientific_name}>
          <Link to={edge.node.fields!.slug!}>
            <GatsbyImage
              image={firstImage?.childImageSharp?.gatsbyImageData!}
              alt={`${edge.node.frontmatter!.scientific_name}`}
            />
            <div style={{ color: 'black' }}>
              <span className='italic-text'>{edge.node.frontmatter!.scientific_name}</span>{' '}
              {!!edge.node.frontmatter!.name && (<>({edge.node.frontmatter!.name})</>)}
            </div>
          </Link>
        </div>
      );
    });

  function buildTaxonomyTree(parentTaxa: string, level: number): JSX.Element {
    const taxaAtLevel = Array.from(
      data.taxa.edges
        .filter((edge) => {
          const { taxonomy } = edge.node.frontmatter!;
          return taxonomy?.[level - 1] === parentTaxa;
        })
        .reduce((acc, edge) => {
          const { taxonomy } = edge.node.frontmatter!;
          const taxon = taxonomy?.[level];
          if (!taxon) return acc;
          if (!search || isMatchOrDescendantMatch(taxon)) {
            acc.add(taxon);
          }
          return acc;
        }, new Set<string>()),
    ).sort();

    const speciesListAtLevel = data.taxa.edges
      .filter((edge) => {
        const { taxonomy, scientific_name, name } = edge.node.frontmatter!;
        const matchesParent = taxonomy?.[taxonomy.length - 1] === parentTaxa;
        if (!matchesParent) return false;
        if (!search) return true;
        const str = `${scientific_name} ${name ?? ''} ${taxonomy?.join(' ')}`.toLowerCase();
        return str.includes(search.toLowerCase());
      })
      .map((species) => (
        <li key={species.node.frontmatter!.scientific_name}>
          <Link to={species.node.fields!.slug!}>
            <span className='italic-text'>{species.node.frontmatter!.scientific_name}</span>{' '}
            {!!species.node.frontmatter!.name && (<>({species.node.frontmatter!.name})</>)}
          </Link>
        </li>
      ));

    return (
      <ul className="taxa-tree">
        {speciesListAtLevel}
        {taxaAtLevel.map((taxon) => {
          const taxonRank = generateTaxaRank(taxon);
          return (
            <li key={taxon}>
              <Link className="dark-link" to={`/taxa/${taxon.toLowerCase()}`}>
                <span className='italic-text'>{taxon}</span> {taxonRank.length > 0 ? `(${taxonRank})` : ''}
              </Link>
              {buildTaxonomyTree(taxon, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  const taxonRank = generateTaxaRank(pageContext.taxon);

  return (
    <>
      <main className="container page">
        <Link to="/">&lt; Back to Home</Link>
        <h3 className="noMargin">
          <span className='italic-text'>{pageContext.taxon}</span>{' '}
          {taxonRank.length > 0 ? `(${taxonRank})` : ''}
        </h3>
        <h5>
          {data.taxa.edges.length} species found - {iNatLink}
        </h5>
        <TaxonomyBreadcrumbs taxonomy={preTaxonomy} noLastLink />
        <hr />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
        />
        {!!data.taxon?.html && (
          <div
            style={{ marginTop: '2em' }}
            dangerouslySetInnerHTML={{
              __html: data.taxon?.html ?? '',
            }}
          />
        )}
        {buildTaxonomyTree(pageContext.taxon, indexOfTaxon)}
        {!!topSpeciesPhotos.length && (
          <div style={{ marginTop: '2em', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {topSpeciesPhotos}
          </div>
        )}
        {!!data.taxon?.frontmatter?.references?.length && (
          <div style={{ marginTop: '2em' }}>
            <References references={data.taxon?.frontmatter?.references as string[]} />
          </div>
        )}
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
    taxa: allMarkdownRemark(filter: { frontmatter: { taxonomy: { eq: $taxon } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            scientific_name
            taxonomy
            photos {
              childImageSharp {
                id
                gatsbyImageData(height: 480, quality: 90, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    taxon: markdownRemark(frontmatter: { taxon: { eq: $taxon } }) {
      html
      frontmatter {
        taxon
        rank
        references
      }
    }
  }
`;
