const rankSuffixes: { [suffix: string]: string } = {
    "fungi": "Kingdom",
    "mycota": "Phylum",
    "mycotina": "Subphylum",
    "mycetes": "Class",
    "mycetidae": "Subclass",
    "ales": "Order",
    "ineae": "Suborder",
    "aceae": "Family",
    "oideae": "Subfamily",
    "ieae": "Tribe",
    "inae": "Subtribe",
};

export const generateTaxaRank = (taxon: string): string =>
    Object.entries(rankSuffixes).find(([suffix]) => taxon.endsWith(suffix))?.[1] || '';