import { IGatsbyImageData } from 'gatsby-plugin-image';

import { Tag } from './tag.util';

export type SpeciesDetails = {
  id: string;
  bodyHtml: string;
  name?: string;
  scientificName: string;
  taxonomy?: string[];
  tags: Tag[];
  externalLinks: { name: string; url: string }[];
  references?: string[];
  photos?: IGatsbyImageData[];
};

export type SpeciesObservation = {
  id: string;
  html: string;
  inatId?: string;
  name?: string;
  scientificName?: string;
  dnaBarcodeIts?: string;
  location?: string;
  datePretty?: string;
  uri?: string;
  photos?: IGatsbyImageData[];
};

export type Species = {
  id: string;
  slug?: string;
  name?: string;
  tags: Tag[];
  locations: string[];
  bodyHtml: string;
  scientificName?: string;
  photos?: IGatsbyImageData[];
};

export type PrintableSpecies = {
  id: string;
  name?: string;
  bodyHtml: string;
  scientificName?: string;
  photos?: { data: string; width: number }[];
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
