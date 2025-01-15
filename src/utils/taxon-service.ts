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

export const generateTaxaRank = (taxon: string): string => {
    for (const suffix in rankSuffixes) {
        if (taxon.endsWith(suffix)) {
            return rankSuffixes[suffix];
        }
    }
    return '';
}