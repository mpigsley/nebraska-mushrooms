export type Observation = {
    id: string;
    observed_on_string: string;
    observed_on: string;
    time_observed_at: string;
    time_zone: string;
    user_id: string;
    user_login: string;
    user_name: string;
    created_at: string;
    updated_at: string;
    quality_grade: string;
    license: string;
    url: string;
    image_url: string;
    sound_url: string;
    tag_list: string;
    description: string;
    num_identification_agreements: string;
    num_identification_disagreements: string;
    captive_cultivated: string;
    oauth_application_id: string;
    place_guess: string;
    latitude: string;
    longitude: string;
    positional_accuracy: string;
    private_place_guess: string;
    private_latitude: string;
    private_longitude: string;
    public_positional_accuracy: string;
    geoprivacy: string;
    taxon_geoprivacy: string;
    coordinates_obscured: string;
    positioning_method: string;
    positioning_device: string;
    species_guess: string;
    scientific_name: string;
    common_name: string;
    iconic_taxon_name: string;
    taxon_id: string;
    taxon_kingdom_name: string;
    taxon_phylum_name: string;
    taxon_subphylum_name: string;
    taxon_superclass_name: string;
    taxon_class_name: string;
    taxon_subclass_name: string;
    taxon_superorder_name: string;
    taxon_order_name: string;
    taxon_suborder_name: string;
    taxon_superfamily_name: string;
    taxon_family_name: string;
    taxon_subfamily_name: string;
    taxon_supertribe_name: string;
    taxon_tribe_name: string;
    taxon_subtribe_name: string;
    taxon_genus_name: string;
    taxon_genushybrid_name: string;
    taxon_species_name: string;
    taxon_hybrid_name: string;
    taxon_subspecies_name: string;
    taxon_variety_name: string;
    taxon_form_name: string;
}

export type TaxonomyRecord = {
    ID: string;
    'Taxon name': string;
    Authors: string;
    'Rank.Rank name': string;
    'Year of effective publication': string;
    'Name status': string;
    'MycoBank #': string;
    Hyperlink: string;
    Classification: string;
    Current_name_Taxon_name: string;
    Synonymy: string;
    // ... any additional fields as needed
}

export type Record = {
    observation: Observation;
    taxonomyRecord?: TaxonomyRecord
    taxonomy: string[];
    season: string;
    photoUrls: string[];
}

export type iNaturalistData = {
    photoUrls: string[];
    description: string;
    sciName: string;
    comments: iNatComment[];
    parentData: ParentData;
}

export type iNatComment = {
    text: string;
}

export type ParentData = {
    url: string;
    text: string;
}

export type MycoBankData = {
    url: string;
    mainReference: string;
}

export type MushroomExpertCitation = {
    text: string;
    url: string;
}