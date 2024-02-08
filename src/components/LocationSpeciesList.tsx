import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';

type Species = {
  id: string;
  slug?: string;
  name?: string;
  location?: string;
  scientificName?: string;
  photos?: IGatsbyImageData[];
};

type LocationSpeciesListProps = Readonly<{
  species: Species[];
}>;

export default function LocationSpeciesList({
  species,
}: LocationSpeciesListProps): JSX.Element {
  const [search, setSearch] = React.useState('');

  const sortedSpecies = React.useMemo(
    () =>
      species
        .filter((edge) =>
          [edge.name, edge.scientificName].some((field) =>
            field?.toLowerCase().includes(search.toLowerCase()),
          ),
        )
        .sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
          return 0;
        }),
    [species, search],
  );

  return (
    <>
      <div className="row">
        <div className="six columns">
          <input
            type="text"
            id="search"
            placeholder="Search for species"
            className="u-full-width"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <table className="u-full-width">
        <thead>
          <tr>
            <th style={{ width: 50 }}>Index</th>
            <th>Common Name(s)</th>
            <th>Scientific Name</th>
          </tr>
        </thead>
        <tbody>
          {sortedSpecies.map((edge) => (
            <tr key={edge.id}>
              <td>
                {edge.photos?.length ? (
                  <GatsbyImage image={edge.photos[0]} alt={edge.name ?? ''} />
                ) : null}
              </td>
              <td>
                <a href={edge.slug ?? '#'}>{edge.name}</a>
              </td>
              <td>{edge.scientificName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
