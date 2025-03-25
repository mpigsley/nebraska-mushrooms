import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import type { SpeciesObservation } from '../utils/species.util';

type ObservationCardProps = {
  observation: SpeciesObservation;
};

export default function ObservationCard({
  observation: {
    id,
    html,
    name,
    scientificName,
    dnaBarcodeIts,
    mycomapBlastLink,
    location,
    datePretty,
    uri,
    photos,
  },
}: ObservationCardProps) {
  return (
    <div key={id} className="observation-card">
      <h5>
        <a href={uri ?? '#'} target="_blank">{`${datePretty} ${location || ''}`}</a>
      </h5>
      {!!photos?.length && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <GatsbyImage image={photos[0]} alt={`${name} (${scientificName})`} />
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: html ?? '' }} />
      {!!dnaBarcodeIts && (
        <>
          DNA Barcode ITS:
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {dnaBarcodeIts}
          </pre>
          {!!mycomapBlastLink && (<a href={mycomapBlastLink} target="_blank">View DNA BLAST Results</a>)}
        </>
      )}
    </div>
  );
}
