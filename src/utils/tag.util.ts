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
  Parasitic = 'parasitic',
  Lichen = 'lichen',
  SlimeMold = 'slime-mold',
  Rust = 'rust',
  Jelly = 'jelly',
  Stinkhorn = 'stinkhorn',
  SubstrateSoil = 'substrate-soil',
  SubstrateWood = 'substrate-wood',
  SubstrateMoss = 'substrate-moss',
  SubstrateDuff = 'substrate-duff',
  SubstrateSpiders = 'substrate-spiders',
  SubstrateInsects = 'substrate-insects',
  SubstrateFungi = 'substrate-fungi',
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
    case Tag.Agaric:
      return 'agaric';
    case Tag.Entomopathogenic:
      return 'entomopathogenic';
    case Tag.SubstrateSoil:
      return 'soil';
    case Tag.SubstrateWood:
      return 'wood';
    case Tag.SubstrateSpiders:
      return 'spiders';
    case Tag.SubstrateInsects:
      return 'insects';
    case Tag.SubstrateDuff:
      return 'duff';
    case Tag.SubstrateMoss:
      return 'substrate-moss'
    case Tag.SubstrateFungi:
      return 'fungi';
    case Tag.Parasitic:
      return 'parasitic';
    default:
      return 'other';
  }
};
