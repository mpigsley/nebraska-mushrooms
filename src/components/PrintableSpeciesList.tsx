import * as React from 'react';

import { Species } from '../utils/species.util';

interface PrintableSpeciesListProps {
  species: Species[];
}

export default function PrintableSpeciesList({
  species,
}: PrintableSpeciesListProps): JSX.Element {
  return <div id="printable">PrintableSpeciesList</div>;
}
