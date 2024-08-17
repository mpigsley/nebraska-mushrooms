import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { FormattedSpecies } from '../utils/species.util';
import { getTagClass, Tag } from '../utils/tag.util';
import Favicon from '../img/favicon.svg';

type TableListProps = {
  species: FormattedSpecies[];
  onChangeTag: (tag: Tag) => void;
};

export default function TableList({ species, onChangeTag }: TableListProps) {
  return (
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
              <td>
                {!!photo ? (
                  <GatsbyImage image={photo} alt={name} />
                ) : (
                  <img src={Favicon} className="defaultTableImg" />
                )}
              </td>
              <td>
                <a href={slug}>{name || scientificName}</a>
                {!!name && <div>{scientificName}</div>}
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
                      key={tag}
                      className={`${getTagClass(
                        tag,
                      )} tag tag-list-item clickable-tag`}
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
}
