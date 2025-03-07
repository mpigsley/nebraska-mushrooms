import * as React from 'react';

import { Species } from '../utils/species.util';

interface PrintableSpeciesListProps {
  species: Species[];
}

export default function PrintableSpeciesList({
  species,
}: PrintableSpeciesListProps): JSX.Element {
  return (
    <div id="printable">
      {species.map((species) => (
        <div key={species.id} className="species">
          <h2>{species.name}</h2>
          <p>{species.scientificName}</p>
          <div dangerouslySetInnerHTML={{ __html: species.bodyHtml }} />
        </div>
      ))}
    </div>
  );
}
