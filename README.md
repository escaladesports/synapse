# Synapse Search

A client side search plugin with no dependencies.

WIP

## Flow
- Search is submit
- If Lunr indexes already exist for URL batches, use those
- If not, create batch
- Search batch
- Render results

## Back end flow
- Keep crawling pages until enough links are found
- If enough links are found or we've parsed all we can, send to batch creator
	+ Let the constructor know if there are no more links
- Create a batch

- Lunr web worker: creates batches or searches existing batches
- Fetch page worker: fetches an array of pages and returns data and links
- Merge into 1 worker?
- Save Lunr indexes in worker memory

## Todo
- Fetch more than 1 page
- Fetch pages all at once
- Display meta descriptions
- Message if no results
- Live search when idle for Xms

- Search icon in input
- Mobile close button placement?
