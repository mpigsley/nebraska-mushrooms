import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import PageLayout from '../components/PageLayout';

export default function IndexPage({
  data,
}: Readonly<PageProps<Queries.LocationIndexQuery>>): JSX.Element {

  return (
    <PageLayout>
      <div>
        <p>Welcome adventurer! This website is designed to provide a location to research parks in Nebraska that have been surveyed for fungi, and view lists of those fungi.</p>
        <hr />
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
                  <h5>How to use this website</h5>
                </a>
              </div>
            </div>
            <div className="qlink-tile qlink-tile-3">
            <div className="qlink-tile-title">
            <a href='/articles/key'>
                <h5>Identification key</h5>
              </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h4>Mushroom of the Day</h4>
        <div>
          <a href='/species/holwaya-mucida/'>
            <div style={{ display: 'flex' }}>
              <img style={{ maxHeight: '10em' }} src='/static/3e634bf11c90136a9910b0d69b8f69f9/a0860/holwaya-mucida1.webp' />
              <div style={{ marginLeft: '1em' }}>
                <h5>Tapioca Club</h5>
                <h6>Holwaya mucida</h6>
                <p>
                  This mushroom grows in troops inside of bark grooves on large fallen Linden trees. Generally found in low, open, moist mixed oak/hickory woodland draws. The white surface easily rubs off and is reminiscent of tapioca. Click here to learn more!
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <hr />
      <div>
        <h4>Locations</h4>
        <div className='grid'>
          <div className='grid-item'>
            <a href='/location/indian-cave-state-park/'>
              <img style={{ maxWidth: '300px' }} src="https://outdoornebraska.gov/wp-content/uploads/2023/01/EF20220701_283_1440x960.jpg" alt="Indian Cave State Park" />
              <h5>Indian Cave State Park</h5>
            </a>
          </div>
          {/* <div className='grid-item'><a href='/location/indian-cave-state-park/'>TODO Entire State</a></div> */}
        </div>
      </div>
    </PageLayout>
  );
}

// add another allMarkdownRemark query
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
                  height: 235
                  width: 235
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
