export enum Tag {
  Poisonous = 'poisonous',
  EdibleWithCaution = 'edible-with-caution',
  Edible = 'edible',
  Interesting = 'interesting',
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
  Winter = 'winter',
  Agaric = 'agaric',
  Bolete = 'bolete',
  Entomopathogenic = 'entomopathogenic',
  Disc = 'disc',
  Chantrelle = 'chantrelle',
  Polypore = 'polypore',
  Conk = 'conk',
  Shelf = 'shelf',
  Crust = 'crust',
  Coral = 'coral',
  Club = 'club',
  Toothed = 'toothed',
  Nest = 'nest',
  Sequestrate = 'sequestrate',
  Lichen = 'lichen',
  SlimeMold = 'slime-mold',
  Rust = 'rust',
  Jelly = 'jelly',
  Stinkhorn = 'stinkhorn',
}

export const getTagClass = (tag: Tag) => {
  switch (tag) {
    case Tag.Poisonous:
      return 'poisonous';
    case Tag.EdibleWithCaution:
      return 'edible-with-caution';
    case Tag.Edible:
      return 'edible';
    case Tag.Interesting:
      return 'interesting';
    case Tag.Spring:
      return 'spring';
    case Tag.Summer:
      return 'summer';
    case Tag.Fall:
      return 'fall';
    case Tag.Winter:
      return 'winter';
    default:
      return 'other';
  }
};
