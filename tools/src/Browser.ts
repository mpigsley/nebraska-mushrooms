import puppeteer from 'puppeteer';
import { ParentData, iNatComment, iNaturalistData } from './types';

/// Ohhhmmmm Ctrl+Cmd+Space mmmmm

export async function getInaturalistData(iNatUrl: string): Promise<iNaturalistData> {
    console.log('🚀 Starting Browser')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('ℹ️ New Page')
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.goto(iNatUrl);

    // Given: the iNat Title is visible. Throws if taking too long.
    await page.waitForSelector('.sciname', { timeout: 5000 });
    console.log(`ℹ️ Page Loaded ${iNatUrl}`)

    // aquire data
    const photoUrls = await page.$$eval('div[aria-label="Thumbnail Navigation"] img', elements => elements.map(element => element.src));
    console.log('✅ Aquired photo urls.')
    const description = await page.evaluate(() => document.querySelector('.UserText')?.textContent);
    console.log('✅ Aquired description.')

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

    console.log('ℹ️ Getting Parent Data')
    await page.click('.ObservationTitle');
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.waitForSelector('.sciname', { timeout: 5000 });
    console.log(`ℹ️ Page Loaded`)
    const text = await page.evaluate(() => document.querySelector('h1')?.textContent)
    const parentData = {
        url: page.url(),
        text
    } as ParentData

    console.log('✅ Parent Data Aquired');

    const data = {
        photoUrls,
        description,
        comments,
        parentData
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