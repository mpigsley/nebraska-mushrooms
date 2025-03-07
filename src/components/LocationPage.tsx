import * as React from 'react';

import LocationSpeciesList from '../components/LocationSpeciesList';
import { type Species } from '../utils/species.util';
import PageLayout from '../components/PageLayout';

interface LocationPageProps {
  title: string;
  geolocation?: string;
  species: Species[];
  description?: string;
}

export default function LocationPage({
  title,
  geolocation,
  species,
  description,
}: LocationPageProps) {
  return (
    <PageLayout>
      <LocationSpeciesList
        species={species}
        title={title}
        geolocation={geolocation}
        description={description}
      />
    </PageLayout>
  );
}
