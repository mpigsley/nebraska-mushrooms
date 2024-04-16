import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import * as React from 'react';

import LocationSpeciesList, { Tag } from '../components/LocationSpeciesList';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';

export default function IndexPage({
  data,
}: Readonly<PageProps<Queries.LocationIndexQuery>>): JSX.Element {
  // let geolocation: string | undefined;
  // if (data.location?.frontmatter?.geolocation) {
  //   const { coordinates } = JSON.parse(
  //     data.location.frontmatter.geolocation,
  //   ) as { type: 'Point'; coordinates: [number, number] };
  //   geolocation = `${coordinates[1]},${coordinates[0]}`;
  // }

  return (
    <PageLayout>
      <div>
        <p>Welcome adventurer! This website is designed to provide a location to research parks in Nebraska that have been surveyed for fungi, and view lists of those fungi.</p>
        <hr />
        <div>
          <h5>Quick Links</h5>
          <div className='grid'>
            <div className='grid-item'><a href='/articles/concerning-wild-mushroom-edibility'>Concerning Wild Mushroom Edibility</a></div>
            <div className='grid-item'><a href='/articles/manual'>How to use this website</a></div>
            <div className='grid-item'><a href='/articles/key'>Identification key</a></div>
          </div>
        </div>
        <hr />
        <h5>Mushroom of the Day</h5>
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
        <h5>Locations</h5>
        <div className='grid'>
          <div className='grid-item'><a href='/location/indian-cave-state-park/'>Indian Cave State Park</a></div>
          <div className='grid-item'><a href='/location/indian-cave-state-park/'>TODO Entire State</a></div>
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
