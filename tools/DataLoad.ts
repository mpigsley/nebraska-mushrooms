import fs from 'fs';
import csv from 'csv-parser';
import puppeteer from 'puppeteer';
import { writeFile, readFile } from 'fs';

const filename = './data.json';

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
            } catch (parseError) {
                console.error('Error parsing JSON from file:', parseError);
            }
        }

    });
}

readJsonFile(filename);

function determineSeason(date: Date): string {
    const month = date.getMonth();
    const day = date.getDate();

    // Spring
    if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
        return "spring";
    }
    // Summer
    else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
        return "summer";
    }
    // Fall
    else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
        return "fall";
    }
    // Winter
    else {
        return "winter";
    }
}

async function processData() {
    const focus = observations.filter(x => x.quality_grade == 'research');
    console.log(`observations: ${focus.length}/${observations.length}, taxa: ${taxonomyRecords.length}`);
    try {
        console.log('Starting browser');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        for (var i = 0; i < focus.length; i++) {
            const observation = focus[i];
            if (records.some(x => x.observation.id === observation.id)) {console.log(`${observation.scientific_name} exists. Skipping.`); continue; }

            const taxon = taxonomyRecords.find(x => x['Taxon name'] == observation.scientific_name);
            if (!taxon) {
                console.log(`taxon not found ${observation.scientific_name}`);
            }

            console.log('Navigating to:' + observation.url);
            await page.goto(observation.url);

            await page.waitForSelector('.sciname');
            console.log('Page loaded');

            const photoUrls = await page.$$eval('div[aria-label="Thumbnail Navigation"] img', elements => elements.map(element => element.src));

            records.push({
                observation,
                taxonomyRecord: taxon,
                taxonomy: taxon?.Classification.replace('Fungi, Dikarya, ', '').split(',').map(x => x.trim()) ?? [],
                season: determineSeason(new Date(observation.observed_on)),
                photoUrls,
            });

            const data = JSON.stringify(records, null, 2);
    
            writeFile(filename, data, (err) => {
                if (err) {
                    console.error('An error occurred:', err);
                    return;
                }
    
                console.log('JSON data is saved.');
            });
        }

        await browser.close();

    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

function readCsv(filePath: string, onEndCallback?: () => void) {
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row: Observation | TaxonomyRecord) => {
            if (filePath === './inat.csv') {
                observations.push(row as Observation);
            }
            else if (filePath === './MBList.csv') {
                taxonomyRecords.push(row as TaxonomyRecord);
            }
            else {
                throw new Error();
            }
            
        })
        .on('end', () => {
            console.log(`${filePath} CSV file successfully processed`);
            if (onEndCallback) {
                onEndCallback();
            }
        });
}

readCsv('./inat.csv');
readCsv('./MBList.csv', processData);