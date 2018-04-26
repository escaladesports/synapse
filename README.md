# Synapse

Back end-less, config-less client side search.

## Without React

```html
<a class='synapseToggle'>Show Search</a>
<input data-synapse-input />
<script src='https://synapse-v2.netlify.com'></script>
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