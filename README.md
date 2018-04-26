# Synapse

Back end-less, config-less client side search.

## Without React

Create an element with a class of `synapseInput` that Synapse will automatically bind to anywhere in between your `<body></body>` tags:

```html
<input class='synapseInput' />
```

Add the JavaScript before your closing `</body>` tag:

```html
<script src='https://synapse-v2.netlify.com/synapse.js'></script>
```

That's it! Then just type something in the input element and hit enter. Synapse will automatically recursively crawl links starting with the ones found on the current page and deliver search results.

Additionally, you can also have any element toggle the search pane with the `synapseToggle` class:

```html
<a class='synapseToggle'>Show Search</a>
```

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
import { Synapse } from 'synapse-search'

...

<Synapse />
```

### Options

Prop | Description | Default
--- | --- | ---
placeholder | Placeholder attribute in input elements | `"Search..."`
noResults | A custom "no results" message/component | `"No Results Found"`
createLink | A function that creates custom links for each result | `(href, contents) => <a href={href}>{contents}</a>`
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