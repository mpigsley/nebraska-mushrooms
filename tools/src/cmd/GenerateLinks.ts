import { getInaturalistData } from '../Browser';

const generateLinks = async (iNatUrl: string) => {
    const inatData = await getInaturalistData(iNatUrl);
    const formattedName = inatData.sciName?.replace(' ', '+');

    console.log(`#### ${inatData.date} Field Notes - Indian Cave State Park`)

    console.log(`
  - tag: iNaturalist Species Description
    link: ${inatData.parentData.url}
  - tag: Mushroom Observer Species Description
    link: https://mushroomobserver.org/names?pattern=${formattedName}
  - tag: Mushroom Expert
    link: https://www.google.com/search?q=${formattedName}+site:www.mushroomexpert.com
    `);
}

generateLinks(process.argv[2]);