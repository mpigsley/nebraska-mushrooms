import { Link } from 'gatsby';
import * as React from 'react';

import TaxonomyBreadcrumbs from '../components/TaxonomyBreadcrumbs';
import { type Tag, getTagClass } from '../utils/tag.util';
import Footer from '../components/Footer';
import References from '../components/References';
import SpeciesImageScroll from './SpeciesImageScroll';
import ObservationCard from './ObservationCard';
import type { SpeciesDetails, SpeciesObservation } from '../utils/species.util';

type SpeciesPageProps = {
  species: SpeciesDetails;
  observations: SpeciesObservation[];
  locations: {
    slug: string;
    title: string;
  }[];
  creationDate?: string;
  modifiedDate?: string;
};

export default function SpeciesPage({
  species,
  observations,
  locations,
  creationDate,
  modifiedDate,
}: SpeciesPageProps): JSX.Element {
  const commonName = species.name;
  const scientificName = species.scientificName;
  console.log([creationDate, modifiedDate])

  let locationSlug = '/location/all/';
  if (locations.length === 1) {
    locationSlug = locations[0].slug ?? locationSlug;
  }

  const speciesPhotos = species.photos ?? [];
  const observationPhotos = observations.flatMap((o) => o.photos ?? []);
  const uniquePhotos = [...speciesPhotos, ...observationPhotos].filter(
    (photo, index, self) =>
      index ===
      self.findIndex(
        (p) => p?.images.fallback?.src === photo?.images.fallback?.src,
      ),
  );

  return (
    <>
      <SpeciesImageScroll
        commonName={species.name}
        scientificName={species.scientificName}
        photos={uniquePhotos}
      />
      <main className="container page">
        <section className="row">
          <Link to={'/'}>&lt; Back to Home</Link>
          <h3 className={`noMargin ${!!!commonName && 'italic-text'}`}>
            {commonName || scientificName}
          </h3>
          {!!commonName && <h5 className="italic-text">{scientificName}</h5>}
          <p>
            {species.taxonomy && (
              <TaxonomyBreadcrumbs taxonomy={species.taxonomy} />
            )}
          </p>
          <hr />
        </section>
        <section className="row">
          <div className="eight columns">
            {species.bodyHtml?.trim().length !== 0 && (
              <>
                <h4>Description</h4>
                <div dangerouslySetInnerHTML={{ __html: species.bodyHtml }} />
              </>
            )}
            {!!observations.length && (
              <>
                <hr />
                <h4>Observations</h4>
                {observations.map((observation) => (
                  <ObservationCard observation={observation} key={observation.inatId} />
                ))}
              </>
            )}
            {!!species.references?.length && (
              <>
                <hr />
                <References references={species.references} />
              </>
            )}
          </div>

          <div className="four columns">
            {!!locations && (
              <>
                <b>Locations</b>
                <ul>
                  {locations.map((loc) => (
                    <li key={loc.slug}>
                      <a href={loc.slug ?? '/location/all'}>{loc.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!!species.externalLinks.length && (
              <>
                <b>External Links</b>
                <ul>
                  {species.externalLinks.map((item) => (
                    <li key={item?.name}>
                      <a
                        href={item?.url ?? '/'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!!species.tags.length && (
              <>
                <b>Tags</b>
                <ul>
                  {[...species.tags]
                    .sort((a, b) => (a && b ? a.localeCompare(b) : 0))
                    .map((item) => (
                      <li key={item}>
                        <Link to={`${locationSlug}?t=${item}`}>
                          <span className={`${getTagClass(item as Tag)} tag`}>
                            {item}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </section>
        <hr />
        {(!!creationDate && !!modifiedDate) && (<p>Created <span className='italic-text'>{creationDate}</span> and last updated <span className='italic-text'>{modifiedDate}</span></p>)}
      </main>
      <Footer />
    </>
  );
}
