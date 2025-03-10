import { IGatsbyImageData } from 'gatsby-plugin-image';

import { Tag } from './tag.util';

export type Species = {
  id: string;
  slug?: string;
  name?: string;
  tags: Tag[];
  locations: string[];
  bodyHtml: string;
  scientificName?: string;
  photos?: IGatsbyImageData[];
  printablePhotos?: { data: string; width: number }[];
};

export type FormattedSpecies = {
  id: string;
  slug: string;
  name: string;
  tags: Tag[];
  scientificName: string;
  photo?: IGatsbyImageData;
  bodyMatch?: [string, string, string]; // [pre-text, match, post-text]
};
