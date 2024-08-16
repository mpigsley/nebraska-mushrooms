import { Image, Menu } from 'react-feather';
import * as React from 'react';

import { useActiveSearch } from '../utils/active-search';
import SpeciesImageList from './SpeciesImageList';
import SpeciesTableList from './SpeciesTableList';
import { Species } from '../utils/species.util';
import ClearableInput from './ClearableInput';
import { Tag } from '../utils/tag.util';
import TagSelect from './TagSelect';

function stripHtml(html: string) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html;
  const result = tmp.textContent ?? tmp.innerText ?? '';
  tmp.remove();
  return result;
}

const TagMatch = Object.values(Tag).map((tag) => `tag:${tag}`);

const PRE_POST_PADDING = 20;
const buildBodyMatch = (
  bodyHtml: string,
  search: string,
): [string, string, string] | undefined => {
  if (search.length < 3) {
    return;
  }
  const bodyText = stripHtml(bodyHtml);
  const index = bodyText.toLowerCase().indexOf(search.toLowerCase());
  if (index === -1) {
    return;
  }

  const preText = bodyText.slice(Math.max(0, index - PRE_POST_PADDING), index);
  const match = bodyText.slice(index, index + search.length);
  const postText = bodyText.slice(
    index + search.length,
    index + search.length + PRE_POST_PADDING,
  );

  return [preText, match, postText];
};

export type LocationSpeciesListProps = Readonly<{
  species: Species[];
}>;

export default function LocationSpeciesList({
  species,
}: LocationSpeciesListProps): JSX.Element {
  const [listType, setListType] = React.useState<'table' | 'image'>('image');
  const { search, setSearch } = useActiveSearch();

  const { matchedTag, filteredSearch } = React.useMemo(() => {
    const matchedTag = TagMatch.find((tag) => search.includes(tag))?.split(
      ':',
    )[1] as Tag | undefined;
    const filteredSearch = search
      .replace(new RegExp(`tag:(${Object.values(Tag).join('|')}) `, 'g'), '')
      .replace(new RegExp(`tag:(${Object.values(Tag).join('|')})`, 'g'), '')
      .trim();
    return { matchedTag, filteredSearch };
  }, [search]);

  const formattedSpecies = React.useMemo(
    () =>
      species
        .filter((edge) =>
          [
            edge.name,
            edge.scientificName,
            filteredSearch.length > 2 ? stripHtml(edge.bodyHtml) : '',
          ].some((field) => {
            const searchMatch =
              !!field &&
              field.toLowerCase().includes(filteredSearch.toLowerCase());
            const tagMatch = !!matchedTag && edge.tags.includes(matchedTag);

            return (
              (!filteredSearch && !matchedTag) ||
              (searchMatch && !!filteredSearch) ||
              tagMatch
            );
          }),
        )
        .sort((a, b) => {
          if (a.scientificName && b.scientificName) {
            return a.scientificName.localeCompare(b.scientificName);
          }
          return 0;
        })
        .map((species) => ({
          id: species.id,
          slug: species.slug ?? '',
          name: species.name ?? '',
          tags: species.tags,
          scientificName: species.scientificName ?? '',
          photo: species.photos?.[0],
          bodyMatch: buildBodyMatch(species.bodyHtml, filteredSearch),
        })),
    [species, matchedTag, filteredSearch],
  );

  const ActiveList = listType === 'table' ? SpeciesTableList : SpeciesImageList;

  const onChangeTag = (tag: Tag) => {
    const filteredSearch = search.replace(
      new RegExp(`tag:(${Object.values(Tag).join('|')})`, 'g'),
      '',
    );
    setSearch(`${filteredSearch} tag:${tag}`.trim());
  };

  return (
    <>
      <div className="row">
        <div className="seven columns">
          <ClearableInput
            type="text"
            id="search"
            placeholder="Search for species"
            className="u-full-width"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
          />
          <TagSelect className="u-full-width mb-3" />
        </div>
        <div className="five columns content-right">
          <button
            type="button"
            className={`button${
              listType === 'table' ? '-primary' : ''
            } button-icon`}
            onClick={() => {
              if (listType !== 'table') {
                setListType('table');
              }
            }}
          >
            <Menu size={20} />
          </button>
          <button
            type="button"
            className={`button${
              listType === 'image' ? '-primary' : ''
            } button-icon ml-2`}
            onClick={() => {
              if (listType !== 'image') {
                setListType('image');
              }
            }}
          >
            <Image size={20} />
          </button>
        </div>
      </div>
      <ActiveList species={formattedSpecies} onChangeTag={onChangeTag} />
    </>
  );
}
