import * as React from 'react';

import LocationSpeciesList from '../components/LocationSpeciesList';
import { useActiveFilters } from '../utils/active-filter';
import { useActiveSearch } from '../utils/active-search';
import { type Species } from '../utils/species.util';
import PageLayout from '../components/PageLayout';
import { Tag } from '../utils/tag.util';
import PrintableSpeciesList from './PrintableSpeciesList';

interface LocationPageProps {
  title: string;
  geolocation?: string;
  species: Species[];
  description?: string;
}

function stripHtml(html: string) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html;
  const result = tmp.textContent ?? tmp.innerText ?? '';
  tmp.remove();
  return result;
}

export default function LocationPage({
  title,
  geolocation,
  species,
  description,
}: LocationPageProps) {
  const { filters, setFilters } = useActiveFilters();
  const { search, setSearch } = useActiveSearch();

  const filteredSortedSpecies = React.useMemo(
    () =>
      species
        .filter((edge) =>
          [
            edge.name,
            edge.scientificName,
            search.length > 2 ? stripHtml(edge.bodyHtml) : '',
          ].some((field) => {
            const searchMatch =
              !!field && field.toLowerCase().includes(search.toLowerCase());
            const tagMatch = filters.every((filter) =>
              edge.tags.includes(filter as Tag),
            );

            return (
              (!search && !filters.length) ||
              ((!search || searchMatch) && (!filters.length || tagMatch))
            );
          }),
        )
        .sort((a, b) => {
          if (a.scientificName && b.scientificName) {
            return a.scientificName.localeCompare(b.scientificName);
          }
          return 0;
        }),
    [species, filters, search],
  );

  const onChangeTag = (tag: Tag) =>
    setFilters((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });

  return (
    <PageLayout
      printable={<PrintableSpeciesList species={filteredSortedSpecies} />}
    >
      <LocationSpeciesList
        species={filteredSortedSpecies}
        title={title}
        geolocation={geolocation}
        description={description}
        onChangeTag={onChangeTag}
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
      />
    </PageLayout>
  );
}
