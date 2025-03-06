import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { graphql, PageProps } from 'gatsby';
import * as React from 'react';

import WildMushroomEdibility from '../img/wild-mushroom-edibility.jpeg';
import HowToUseThisWebiste from '../img/how-to-use-this-website.jpeg';
import IdentificationKey from '../img/identification-key.jpeg';
import MushrooomList from '../img/mushroom-list.jpeg';
import { Tag, getTagClass } from '../utils/tag.util';
import PageLayout from '../components/PageLayout';

export default function IndexPage({
  data,
}: Readonly<PageProps<Queries.LocationIndexQuery>>): JSX.Element {
  const [rando, setRando] = React.useState<any>(null);

  const generateRando = () =>
    setRando(
      data.species.edges[
        Math.floor(Math.random() * (data.species.edges.length - 1))
      ].node,
    );

  React.useEffect(() => {
    generateRando();
  }, []);

  return (
    <PageLayout>
      <div>
        <div className="row">
          <div className="six columns relative link-tile content-centered mb-4">
            <img src={WildMushroomEdibility} className="centered-image" />
            <a
              className="mx-2 grid-link"
              href="/articles/concerning-wild-mushroom-edibility"
            >
              <h5 className="noMargin">Wild Mushroom Edibility</h5>
            </a>
          </div>
          <div className="six columns relative link-tile content-centered mb-4">
            <img src={HowToUseThisWebiste} className="centered-image" />
            <a className="mx-2 grid-link" href="/articles/manual">
              <h5 className="noMargin">How to Use This Website</h5>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="six columns relative link-tile content-centered mb-4">
            <img src={IdentificationKey} className="centered-image" />
            <a className="mx-2 grid-link" href="/articles/key">
              <h5 className="noMargin">Identification Key</h5>
            </a>
          </div>
          <div className="six columns relative link-tile content-centered mb-4">
            <img src={MushrooomList} className="centered-image" />
            <a className="mx-2 grid-link" href="/taxa/life/">
              <h5 className="noMargin">Species List</h5>
            </a>
          </div>
        </div>
        <hr />
        <div className="content-spaced">
          <h4>Random Mushroom</h4>
          <button className="ml-2" onClick={generateRando}>
            Regenerate
          </button>
        </div>

        <div className="row random-mushroom-tile">
          {!!rando?.frontmatter && (
            <>
              <GatsbyImage
                className="six columns"
                key={rando.frontmatter.photos[0]?.childImageSharp?.id}
                image={
                  rando.frontmatter.photos[0]?.childImageSharp?.gatsbyImageData
                }
                alt={`${rando.frontmatter.name} (${rando.frontmatter.photos[0]?.scientific_name})`}
              />
              <div className="six columns my-3">
                <h5 className="noMargin">
                  <a href={rando.fields.slug}>
                    {rando?.frontmatter.name ??
                      (<span className='italic-text'>{rando?.frontmatter.scientific_name}</span>)}
                  </a>
                </h5>
                {!!rando?.frontmatter.name && (
                  <h6><span className='italic-text'>{rando?.frontmatter.scientific_name}</span></h6>
                )}
                <p>{rando?.frontmatter.html}</p>
                {!!rando?.frontmatter?.tags?.length && (
                  <>
                    <ul>
                      {[...rando.frontmatter.tags]
                        .sort((a, b) => (a && b ? a.localeCompare(b) : 0))
                        .map((item) => (
                          <li key={item}>
                            <span className={`${getTagClass(item as Tag)} tag`}>
                              {item}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h4>Locations</h4>
        <div className="row mb-4">
          <a className="" href='location/all'>
            <div className="twelve columns relative location-tile content-centered">
              <StaticImage
                src="../img/nebraska.jpg"
                alt="All Nebraska Mushrooms"
                className='centered-image'
              />
              <h5 className="noMargin mx-2 grid-link">
                All Nebraska Mushrooms
              </h5>
            </div>
          </a>
        </div>
        {data.locations.edges.map(({ node }) => (
          <div className="row mb-4" key={node.id}>
            <a className="" href={node.fields?.slug!}>
              <div className="twelve columns relative location-tile content-centered">
                {!!node.frontmatter?.heroImage?.childImageSharp?.id && (
                  <GatsbyImage
                    className="centered-image"
                    key={node.frontmatter.heroImage.childImageSharp.id}
                    image={
                      node.frontmatter.heroImage.childImageSharp.gatsbyImageData
                    }
                    alt={node.frontmatter.title!}
                  />
                )}
                <h5 className="noMargin mx-2 grid-link">
                  {node.frontmatter?.title!}
                </h5>
              </div>
            </a>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export const query = graphql`
  query LocationIndex {
    locations: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "location" } } }
      sort: { frontmatter: { title: ASC } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            geolocation
            title
            heroImage {
              childImageSharp {
                id
                gatsbyImageData(
                  quality: 90
                  height: 400
                  width: 960
                  layout: CONSTRAINED
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
    }
    species: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "species" } } }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            name
            scientific_name
            tags
            photos {
              childImageSharp {
                id
                gatsbyImageData(
                  quality: 90
                  height: 300
                  width: 468
                  layout: CONSTRAINED
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
    }
  }
`;
