# Synapse

Back end-less, config-less client side search. Uses React, but also works without.

[Demo](https://synapse-v2.netlify.com/)

## Without React

Create an element with a data attribute of `data-synapse-input` that Synapse will automatically inject the input tag into as well as a `data-synapse-results` element for the results.

```html
<div data-synapse-input></div>
<div data-synapse-results></div>
```

Add the JavaScript before your closing `</body>` tag:

```html
<script src='https://synapse-v2.netlify.com/index.js'></script>
<script>
	new SynapseInject()
</script>
```

That's it! Then just type something in the input. Synapse will automatically recursively crawl links starting with the ones found on the current page and deliver search results.

## With React

### Installation

With npm:

```bash
npm install --save synapse-search
```

Or with Yarn:

```bash
yarn add synapse-search
```

### Usage

```jsx
import { SynapseInput, SynapseResults } from 'synapse-search'

...

<SynapseInput />
<SynapseResults />
```

Alternatively there is also a fully styled modal that will open up when the user starts typing. This can be useful for a quick drop-in solution:

```jsx
import { SynapseInput, SynapseModal } from 'synapse-search'

...

<SynapseInput />
<SynapseModal />
```

### Options

Without React, you can pass options to the constructor:

```javascript
new SynapseInject({
	matchThreshold: .01
})
```

With React, you can use the SynapseConfig function:

```jsx
import { SynapseConfig } from 'synapse-search'

SynapseConfig({
	matchThreshold: .01
})
```

Prop | Description | Default
--- | --- | ---
placeholder | Placeholder attribute in input elements | `"Search..."`
noResults | A custom "no results" message/component | `"No Results Found"`
createLink | A function that creates custom links for each result | `(href, contents) => <a href={href}>{contents}</a>`
contentSelector | A query selector of the content on the page to crawl | `"body"`
matchThreshold | Do not show result if match is under this threshold | `.007`
batchSize | The number of pages to fetch per batch | `6`
batchSearch | The number of batches to create per search | `3`

## Things to Consider

### Performance

While Synapse will work with any website, it is best used on small to medium size websites (less than 100 pages). Search results will be less accurate the more pages there are or if there's not a lot of hyperlinks on each page for it to crawl. For larger websites, [Algolia](https://www.algolia.com/) is a great alternative.

### Don't use Synapse if:

- You want to crawl multiple domains
- You want to quickly search > 100 pages
- You need more complicated search parameters

### Use Synapse if:

- You just want a simple search function on your site with no bells & whistles
- You don't want to be dependent on a third party for search
- You're cheap