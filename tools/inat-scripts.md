# inat scrape scripts

```
// get list of updates from a user from url https://www.inaturalist.org/home?tab=yours
// generates array of `${name}: ${url}`
// you'll need to keep clicking 'More' at the bottom to keep collecting the results.

Array.from(document.querySelectorAll('#updates_by_you_target .timeline-panel')).filter(x => x.innerText.includes('stevilkinevil')).filter(x => !!x.querySelector('.taxon a')).filter(x => !x.querySelector('.taxon a').href.includes('/taxa/')).map(x => `${x.querySelector('.taxon')?.innerText}: ${x.querySelector('.taxon a')?.href}`)
```