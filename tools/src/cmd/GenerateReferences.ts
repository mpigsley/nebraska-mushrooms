import { getMushroomExpertCitation } from '../Browser';

const generateReferences = async (url: string) => {
    const mushroomExpertCitation = await getMushroomExpertCitation(url);

    console.log(`
references:
    -  '${mushroomExpertCitation.text}'
`);
    // TODO add mycobank reference
}

generateReferences(process.argv[2]);