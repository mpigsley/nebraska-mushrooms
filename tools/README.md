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

Markdown and pictures can be moved to their respective folders.

## Bulk Modify Existing

// todo