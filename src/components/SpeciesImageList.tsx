import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { FormattedSpecies } from '../utils/species.util';
import { getTagClass, Tag } from '../utils/tag.util';
import Favicon from '../img/favicon.svg';

type ImageListProps = {
  species: FormattedSpecies[];
  onChangeTag: (tag: Tag) => void;
};

export default function ImageList({ species, onChangeTag }: ImageListProps) {
  return (
    <div className="grid">
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
          <a key={id} href={slug} className="grid-item">
            <div>
              {!!photo ? (
                <GatsbyImage className="grid-image" image={photo} alt={name} />
              ) : (
                <img src={Favicon} className="defaultGridImg" />
              )}
              <h5 className="noMargin small-header my-1">
                {name || <span className="italic-text">{scientificName}</span>}
              </h5>
              {!!name && (
                <div className="mb-2">
                  <span className="italic-text">{scientificName}</span>
                </div>
              )}
              <div>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    role="button"
                    className={`${getTagClass(
                      tag,
                    )} tag tag-list-item clickable-tag`}
                    onClick={(e) => {
                      e.preventDefault();
                      onChangeTag(tag);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
}
