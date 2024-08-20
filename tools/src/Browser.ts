import puppeteer from 'puppeteer';
import { MushroomExpertCitation, ParentData, iNatComment, iNaturalistData } from './types';
import { formatDate } from './DateUtils';

/// Ohhhmmmm Ctrl+Cmd+Space mmmmm

export async function getInaturalistData(iNatUrl: string): Promise<iNaturalistData> {
    console.log('🚀 Starting Browser')
    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    console.log('ℹ️ New Page')
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.goto(iNatUrl);

    // Given: the iNat Title is visible. Throws if taking too long.
    await page.waitForSelector('.sciname', { timeout: 5000 });
    console.log(`ℹ️ Page Loaded ${iNatUrl}`)

    // aquire data
    const sciName = await page.evaluate(() => document.querySelector('.ObservationTitle .sciname')?.textContent);
    if (!!sciName) {
        console.log('✅ Sciname aquired.')
    } else {
        console.log('❌ Sciname not found.')
    }
    const photoUrls = await page.$$eval('div[aria-label="Thumbnail Navigation"] img', elements => elements.map(element => element.src));
    console.log('✅ Aquired photo urls.')
    const description = await page.evaluate(() => document.querySelector('.UserText')?.textContent);
    console.log('✅ Aquired description.')
    const dateLong = await page.evaluate(() => (document.querySelector('.date_row .date')as HTMLSpanElement)?.title);
    const date = formatDate(dateLong || '');
    console.log('✅ Aquired date.')

    const comments: iNatComment[] = await page.evaluate(() => {
        const parentDiv = document.querySelector('.activity');
        if (!parentDiv) {
            return [];
        }

        return Array.from(parentDiv.children).map(child => {
            return {
                text: child.textContent
            } as iNatComment;
        });

    });
    console.log('✅ Added comments.')

    const parentUrl = await page.evaluate(() => (document.querySelector('.ObservationTitle a') as HTMLAnchorElement).href);
    console.log('✅ Added Parent link.')

    const parentData = {
        url: parentUrl,
        text: sciName
    } as ParentData

    console.log('✅ Parent Data Aquired');

    const data = {
        photoUrls,
        description,
        comments,
        parentData,
        sciName: sciName || '',
        date,
    } as iNaturalistData;

    console.log('🧹 Cleaning up')
    page.close();
    browser.close();
    console.log({ data });
    console.log({comments: data.comments})
    console.log({parentData: data.parentData})
    console.log('✅ Complete')
    return data;
}

export async function getMushroomExpertCitation(url: string): Promise<MushroomExpertCitation> {
    console.log('🚀 Starting Browser')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('ℹ️ New Page')
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.goto(url);

    const citation = await page.evaluate(() => Array.from(document.querySelectorAll('table')).reverse()[0]?.querySelector('font[size="-2"]')?.textContent);
    console.log('✅ Citation Aquired');

    console.log('🧹 Cleaning up')
    page.close();
    browser.close();
    console.log('✅ Complete')

    return {
        url,
        text: citation || ''
    } as MushroomExpertCitation
}