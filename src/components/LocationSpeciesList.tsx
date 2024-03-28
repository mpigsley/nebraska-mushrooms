import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Image, Menu } from 'react-feather';
import * as React from 'react';

export enum Tag {
  Edible = 'edible',
  Poisonous = 'poisonous',
  Interesting = 'interesting',
}

type Species = {
  id: string;
  slug?: string;
  name?: string;
  tags: Tag[];
  location?: string;
  bodyHtml: string;
  scientificName?: string;
  photos?: IGatsbyImageData[];
};

type LocationSpeciesListProps = Readonly<{
  species: Species[];
}>;

type FormattedSpecies = {
  id: string;
  slug: string;
  name: string;
  tags: Tag[];
  scientificName: string;
  photo?: IGatsbyImageData;
  bodyMatch?: [string, string, string]; // [pre-text, match, post-text]
};

const TagMatch = Object.values(Tag).map((tag) => `tag:${tag}`);
function stripHtml(html: string) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html;
  const result = tmp.textContent ?? tmp.innerText ?? '';
  tmp.remove();
  return result;
}

const ImageList = ({ species }: { species: FormattedSpecies[] }) => (
  <div className="grid">
    {species.map(
      ({
        id,
        slug,
        name,
        scientificName,
        photo,
        bodyMatch,
      }: FormattedSpecies) => (
        <a key={id} href={slug} className="grid-item">
          <div>
            {!!photo && (
              <GatsbyImage className="grid-image" image={photo} alt={name} />
            )}
            <h5 className="noMargin">{name}</h5>
            <div className="mb-2">{scientificName}</div>
            {!!bodyMatch && (
              <>
                <i>{bodyMatch[0]}</i>
                <b>{bodyMatch[1]}</b>
                <i>{bodyMatch[2]}</i>
              </>
            )}
          </div>
        </a>
      ),
    )}
  </div>
);

const TableList = ({
  species,
  onChangeTag,
}: {
  species: FormattedSpecies[];
  onChangeTag: (tag: Tag) => void;
}) => (
  <table className="u-full-width">
    <thead>
      <tr>
        <th className="photo-table-column">Index</th>
        <th className="main-table-column">Species Name(s)</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      {species.map(
        ({
          id,
          slug,
          name,
          tags,
          scientificName,
          photo,
          bodyMatch,
        }: FormattedSpecies) => (
          <tr key={id}>
            <td>{!!photo && <GatsbyImage image={photo} alt={name} />}</td>
            <td>
              <a href={slug}>{name}</a>
              <div>{scientificName}</div>
              {!!bodyMatch && (
                <div>
                  <i>{bodyMatch[0]}</i>
                  <b>{bodyMatch[1]}</b>
                  <i>{bodyMatch[2]}</i>
                </div>
              )}
            </td>
            <td>
              <div className="tag-container">
                {tags.map((tag) => (
                  <span
                    className={`${tag} tag tag-list-item clickable-tag`}
                    onClick={() => onChangeTag(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ),
      )}
    </tbody>
  </table>
);

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

export default function LocationSpeciesList({
  species,
}: LocationSpeciesListProps): JSX.Element {
  const [listType, setListType] = React.useState<'table' | 'image'>('table');
  const [search, setSearch] = React.useState('');

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

            console.log(
              edge.name,
              !filteredSearch && !matchedTag,
              searchMatch,
              tagMatch,
            );

            return (
              (!filteredSearch && !matchedTag) ||
              (searchMatch && !!filteredSearch) ||
              tagMatch
            );
          }),
        )
        .sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
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

  const ActiveList = listType === 'table' ? TableList : ImageList;

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
        <div className="six columns content-right">
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
