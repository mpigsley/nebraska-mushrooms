import * as React from 'react';

import LocationSpeciesList from '../components/LocationSpeciesList';
import { type Species } from '../utils/species.util';
import PageLayout from '../components/PageLayout';

interface LocationPageProps {
  title: string;
  geolocation?: string;
  species: Species[];
}

export default function LocationPage({
  title,
  geolocation,
  species,
}: LocationPageProps) {
  return (
    <PageLayout>
      <h3>
        {title}
        {!!geolocation && (
          <a
            className="maps-link"
            href={`https://www.google.com/maps/place/${geolocation}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Map
          </a>
        )}
      </h3>
      <LocationSpeciesList species={species} />
    </PageLayout>
  );
}
