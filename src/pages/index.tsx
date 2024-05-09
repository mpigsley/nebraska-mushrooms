import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, PageProps } from 'gatsby';
import * as React from 'react';

import WildMushroomEdibility from '../img/wild-mushroom-edibility.jpeg';
import HowToUseThisWebiste from '../img/how-to-use-this-website.jpeg';
import IndianCaveStatePark from '../img/indian-cave-state-park.jpeg';
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
        <h4>Quick Links</h4>
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
            <a
              className="mx-2 grid-link"
              href="/location/indian-cave-state-park"
            >
              <h5 className="noMargin">Mushroom List</h5>
            </a>
          </div>
        </div>
        <hr />
        <div className="content-spaced">
          <h4>Random Mushroom</h4>
          <button onClick={generateRando}>Regenerate</button>
        </div>

        <div className="row">
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
                      rando?.frontmatter.scientific_name}
                  </a>
                </h5>
                {!!rando?.frontmatter.name && (
                  <h6>{rando?.frontmatter.scientific_name}</h6>
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
        <div className="row">
          <div className="twelve columns relative location-tile content-centered">
            <img src={IndianCaveStatePark} className="centered-image" />
            <a
              className="mx-2 grid-link"
              href="/location/indian-cave-state-park/"
            >
              <h5 className="noMargin">Indian Cave State Park</h5>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export const query = graphql`
  query LocationIndex {
    location: markdownRemark(
      frontmatter: { title: { eq: "Indian Cave State Park" } }
    ) {
      frontmatter {
        geolocation
        title
      }
    }
    species: allMarkdownRemark(
      filter: { frontmatter: { location: { eq: "Indian Cave State Park" } } }
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
            location
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
