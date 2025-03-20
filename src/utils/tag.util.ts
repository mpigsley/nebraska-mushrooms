export enum EdibilityTags {
  Poisonous = 'poisonous',
  EdibleWithCaution = 'edible-with-caution',
}

export enum SeasonTags {
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
  Winter = 'winter',
}

export enum FormTags {
  Agaric = 'agaric',
  Bolete = 'bolete',
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

export enum FunctionTags {
  Entomopathogenic = 'entomopathogenic',
  Parasitic = 'parasitic',
}

export enum SubstrateTags {
  SubstrateSoil = 'substrate-soil',
  SubstrateWood = 'substrate-wood',
  SubstrateMoss = 'substrate-moss',
  SubstrateDuff = 'substrate-duff',
  SubstrateSpiders = 'substrate-spiders',
  SubstrateInsects = 'substrate-insects',
  SubstrateFungi = 'substrate-fungi',
  SubstrateDung = 'substrate-dung',
  SubstrateSeeds = 'substrate-seeds',
}

export enum Tag {
  EdibilityPoisonous = EdibilityTags.Poisonous,
  EdibilityEdibleWithCaution = EdibilityTags.EdibleWithCaution,

  SeasonSpring = SeasonTags.Spring,
  SeasonSummer = SeasonTags.Summer,
  SeasonFall = SeasonTags.Fall,
  SeasonWinter = SeasonTags.Winter,

  FormAgaric = FormTags.Agaric,
  FormBolete = FormTags.Bolete,
  FormDisc = FormTags.Disc,
  FormChantrelle = FormTags.Chantrelle,
  FormPolypore = FormTags.Polypore,
  FormConk = FormTags.Conk,
  FormShelf = FormTags.Shelf,
  FormCrust = FormTags.Crust,
  FormCoral = FormTags.Coral,
  FormClub = FormTags.Club,
  FormToothed = FormTags.Toothed,
  FormNest = FormTags.Nest,
  FormSequestrate = FormTags.Sequestrate,
  FormLichen = FormTags.Lichen,
  FormSlimeMold = FormTags.SlimeMold,
  FormRust = FormTags.Rust,
  FormJelly = FormTags.Jelly,
  FormStinkhorn = FormTags.Stinkhorn,

  FunctionEntomopathogenic = FunctionTags.Entomopathogenic,
  FunctionParasitic = FunctionTags.Parasitic,

  SubstrateSoil = SubstrateTags.SubstrateSoil,
  SubstrateWood = SubstrateTags.SubstrateWood,
  SubstrateMoss = SubstrateTags.SubstrateMoss,
  SubstrateDuff = SubstrateTags.SubstrateDuff,
  SubstrateSpiders = SubstrateTags.SubstrateSpiders,
  SubstrateInsects = SubstrateTags.SubstrateInsects,
  SubstrateFungi = SubstrateTags.SubstrateFungi,
  SubstrateDung = SubstrateTags.SubstrateDung,
}

export const getTagClass = (tag: Tag) => {
  switch (tag) {
    case Tag.EdibilityPoisonous:
      return 'tag-red';
    case Tag.EdibilityEdibleWithCaution:
      return 'tag-yellow';

    case Tag.SeasonSpring:
      return 'tag-blue';
    case Tag.SeasonSummer:
      return 'tag-green';
    case Tag.SeasonFall:
      return 'tag-amber';
    case Tag.SeasonWinter:
      return 'tag-light-sky';

    case Tag.FormAgaric:
      return 'tag-peach';
    case Tag.FormBolete:
      return 'tag-brown';
    case Tag.FormDisc:
      return 'tag-pink';
    case Tag.FormChantrelle:
      return 'tag-mauve';
    case Tag.FormPolypore:
      return 'tag-amber';
    case Tag.FormConk:
      return 'tag-gold';
    case Tag.FormShelf:
      return 'tag-forest-green';
    case Tag.FormCrust:
      return 'tag-sand';
    case Tag.FormCoral:
      return 'tag-dusty-rose';
    case Tag.FormClub:
      return 'tag-watermelon';
    case Tag.FormToothed:
      return 'tag-indigo';
    case Tag.FormNest:
      return 'tag-periwinkle';
    case Tag.FormSequestrate:
      return 'tag-aqua';
    case Tag.FormLichen:
      return 'tag-mint';
    case Tag.FormSlimeMold:
      return 'tag-lemon';
    case Tag.FormRust:
      return 'tag-burnt-orange';
    case Tag.FormJelly:
      return 'tag-cloud-blue';
    case Tag.FormStinkhorn:
      return 'tag-rose';

    case Tag.FunctionEntomopathogenic:
      return 'tag-lavender';
    case Tag.FunctionParasitic:
      return 'tag-red';

    case Tag.SubstrateSoil:
      return 'tag-sand';
    case Tag.SubstrateWood:
      return 'tag-brown';
    case Tag.SubstrateMoss:
      return 'tag-mint';
    case Tag.SubstrateDuff:
      return 'tag-olive';
    case Tag.SubstrateSpiders:
      return 'tag-plum';
    case Tag.SubstrateInsects:
      return 'tag-blush';
    case Tag.SubstrateFungi:
      return 'tag-pastel-green';
    case Tag.SubstrateDung:
      return 'tag-burnt-orange';

    default:
      return 'tag-other';
  }
};

