import { writeFile, readFile } from 'fs';

const filename = './data.json';
const markdownSpace = '  ';

type Observation = {
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

type TaxonomyRecord = {
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

type Record = {
    observation: Observation;
    taxonomyRecord?: TaxonomyRecord
    taxonomy: string[];
    season: string;
    photoUrls: string[];
}

type PhotoDto = {
    curlCommands: string[];
    markdownLines: string[];
}

const observations: Observation[] = [];
const taxonomyRecords: TaxonomyRecord[] = [];
let records: Record[] = []

function readJsonFile(fileName: string) {
    readFile(fileName, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.error('An error occurred while reading the file:', err);
        } else {
            try {
                records = JSON.parse(data);
                console.log('json file loaded');
                generateOutput();
            } catch (parseError) {
                console.error('Error parsing JSON from file:', parseError);
            }
        }

    });
}

function generateMarkdownPhotos(record: Record): PhotoDto {
    const curlCommands = record.photoUrls.map((x, i) => {
        const path = `./pictures/${record.observation.scientific_name.toLowerCase().replace(' ', '-')}${i + 1}.jpeg`;
        return `[ -f '${path}' ] && echo 'The file exists.' || curl -o ${path} ${x.replace('square', 'large')}`;
    });
    const markdownLines = record.photoUrls.map((x, i) => `${markdownSpace}- /img/${record.observation.scientific_name.toLowerCase().replace(' ', '-')}${i + 1}.jpeg`);
    return {
        curlCommands,
        markdownLines
    };
}

function toProperCase(s: string): string {
    return s.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

function generateOutput() {
    const output = [] as string[];

    records.forEach(record => {
        const recordString = `# record ${record.observation.scientific_name}`;
        output.push(recordString);
        console.log(recordString)
        const photoData = generateMarkdownPhotos(record);
        const taxa = record.taxonomy.map(x => `${markdownSpace}- ${x.trim()}`).join('\n');
    
        const markdown = `"---
templateKey: species
name: ${toProperCase(record.observation.common_name)}
scientific_name: ${record.observation.scientific_name}
location: Indian Cave State Park
tags:
    - ${record.season}
taxonomy:
${taxa}
external_links:
  - tag: MycoBank
    link: ${record.taxonomyRecord!.Hyperlink}
  - tag: iNaturalist Observation
    link: ${record.observation.url}
photos:
${photoData.markdownLines.join('\n')}
---

**Field Characteristics:**

${record.observation.description}"`;
    
        const markdownFilename = `${record.observation.scientific_name.toLowerCase().replace(' ', '-')}.md`;
        const markdownCommand = `touch ./species/${markdownFilename} && echo -e ${markdown} > ./species/${markdownFilename}`;
        const curlCommands = photoData.curlCommands;
        output.push(`${markdownCommand}\n\n${curlCommands.join('\n')}\n`);
    });

    const data = output.join('\n');
    
    writeFile("./dist/terminalInput.bash", data, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            return;
        }

        console.log('data is saved.');
    });
}

readJsonFile(filename);
