# Tools

## Dataloader

* Download inat observations via - https://gsmit.org/wp-content/uploads/2021/04/inaturalist_data_walkthrough.pdf
* Download MBList.xls and convert the first sheet to MBList.csv. Can be found here - https://www.mycobank.org/
* Put both in tools folder

Command to generate data.json (merge of data sources)

```
npm run dataload
```

## Bulk Generate Add

Add the folder structure:

dist
    - pictures
    - species

Command to generate markdown and download pictures (must generate data.json first)

```
npm run addnew
```

Go into the dist folder and run the generated script
```
cd dist
bash terminalInput.bash
```
or
```
cd dist && chmod 755 terminalInput.bash && ./terminalInput.bash && cd ..
```

Markdown and pictures can be moved to their respective folders.

# inat scrape scripts

```
// get list of updates from a user from url https://www.inaturalist.org/home?tab=yours
// generates array of `${name}: ${url}`
// you'll need to keep clicking 'More' at the bottom to keep collecting the results.

Array.from(document.querySelectorAll('#updates_by_you_target .timeline-panel')).filter(x => x.innerText.includes('stevilkinevil')).filter(x => !!x.querySelector('.taxon a')).filter(x => !x.querySelector('.taxon a').href.includes('/taxa/')).map(x => `${x.querySelector('.taxon')?.innerText}: ${x.querySelector('.taxon a')?.href}`)
```