import fs from 'fs';
import csv from 'csv-parser';
import puppeteer from 'puppeteer';
import { writeFile, readFile } from 'fs';
import { Observation, TaxonomyRecord, Record } from './types';

const filename = './data.json';

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
                console.log('✅ json file loaded');
            } catch (parseError) {
                console.error('❌ Error parsing JSON from file:', parseError);
            }
        }

    });
}

readJsonFile(filename);

function determineSeason(date: Date): string {
    const month = date.getMonth();
    const day = date.getDate();

    // Spring
    if ((month === 3 && day >= 20) || month === 4 || (month === 5 && day <= 20)) {
        return "spring";
    }
    // Summer
    else if ((month === 6 && day >= 21) || month === 7 || (month === 8 && day <= 22)) {
        return "summer";
    }
    // Fall
    else if ((month === 9 && day >= 23) || month === 10 || (month === 11 && day <= 20)) {
        return "fall";
    }
    // Winter
    else {
        return "winter";
    }
}

async function processData() {
    // const focus = observations.filter(x => x.quality_grade == 'research');
    const focus = observations
    console.log(`🌱 records/total observations: ${records.length}/${observations.length}, taxa: ${taxonomyRecords.length}`);
    try {
        console.log('🚀 Starting browser');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        for (var i = 0; i < focus.length; i++) {
            const observation = focus[i];
            if (records.some(x => x.observation.id === observation.id)) {console.log(`✅ ${observation.scientific_name}\t\t${observation.url}`); continue; }

            const taxon = taxonomyRecords.find(x => x['Taxon name'] == observation.scientific_name);
            if (!taxon) {
                console.log(`❌ taxon not found ${observation.scientific_name}`);
            }

            console.log(`ℹ️ Navigating to ${observation.scientific_name} ${observation.url}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await page.goto(observation.url);

            try {
                await page.waitForSelector('.sciname', {timeout: 5000});
            } catch (error) {
                console.log('❌ An error occured waiting for the page. Retrying...', error)
                i--;
                continue;
            }


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
                    console.error('❌:', err);
                    return;
                }
    
                console.log(`✅ ${observation.scientific_name} saved.`);
            });
        }

        await browser.close();

    } catch (error) {
        console.error(`❌ An error occurred: ${error}`);
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
            console.log(`✅ ${filePath} CSV file successfully processed`);
            if (onEndCallback) {
                onEndCallback();
            }
        });
}

readCsv('./inat.csv');
readCsv('./MBList.csv', processData);