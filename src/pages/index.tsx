import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import PageLayout from '../components/PageLayout';
import { Tag, getTagClass } from '../utils/tag.util';

export default function IndexPage({
  data,
}: Readonly<PageProps<Queries.LocationIndexQuery>>): JSX.Element {
  const [rando, setRando] = React.useState<any>(null);

  const generateRando = () => setRando(data.species.edges[Math.floor(Math.random() * (data.species.edges.length - 1))].node);

  React.useEffect(() => {
    generateRando();
  }, []);

  return (
    <PageLayout>
      <div>
        <div>
          <h4>Quick Links</h4>
          <div className="qlink-grid">
            <div className="qlink-tile qlink-tile-1">
              <div className="qlink-tile-title">
                <a href='/articles/concerning-wild-mushroom-edibility'>
                  <h5>Wild Mushroom Edibility</h5>
                </a>
              </div>
            </div>
            <div className="qlink-tile qlink-tile-2">
              <div className="qlink-tile-title">
                <a href='/articles/manual'>
                  <h5>How to Use This Website</h5>
                </a>
              </div>
            </div>
            <div className="qlink-tile qlink-tile-3">
              <div className="qlink-tile-title">
                <a href='/articles/key'>
                  <h5>Identification Key</h5>
                </a>
              </div>
            </div>
            <div className="qlink-tile qlink-tile-4">
              <div className="qlink-tile-title">
                <a href='/location/indian-cave-state-park/'>
                  <h5>Mushroom List</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Random Mushroom</h4> <button onClick={generateRando}>Regenerate</button>
        </div>


        <div>
          {!!rando &&
            (
              <div className="qlink-grid">
                <GatsbyImage
                  className="randoImage qlink-tile"
                  key={rando.frontmatter.photos[0]?.childImageSharp?.id}
                  image={rando.frontmatter.photos[0]?.childImageSharp?.gatsbyImageData}
                  alt={`${rando.frontmatter.name} (${rando.frontmatter.photos[0]?.scientific_name})`}
                />
                <div>
                  <h5><a href={rando.fields.slug}>{rando?.frontmatter.name}</a></h5>
                  <h6><a href={rando.fields.slug}>{rando?.frontmatter.scientific_name}</a></h6>
                  <p>
                    {rando?.frontmatter.html}
                  </p>
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
              </div>
            )}
        </div>
      </div>
      <hr />
      <div>
        <h4>Locations</h4>
        <div className='location-grid'>
          <div className='qlink-tile qlink-tile-5'>
            <div className="qlink-tile-title">
              <a href='/location/indian-cave-state-park/'>
                <h5>Indian Cave State Park</h5>
              </a>
            </div>
          </div>
          {/* <div className='grid-item'><a href='/location/indian-cave-state-park/'>TODO Entire State</a></div> */}
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
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`;
