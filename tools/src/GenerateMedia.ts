import { writeFile, readFile } from 'fs';
import { Observation, TaxonomyRecord, Record } from './types';

const filename = './data.json';
const markdownSpace = '  ';

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
    
    writeFile("../dist/terminalInput.bash", data, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            return;
        }

        console.log('data is saved.');
    });
}

readJsonFile(filename);
