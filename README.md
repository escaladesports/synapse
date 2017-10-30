# Synapse Search

A client side drop-in search plugin with no dependencies.

## Implementation

Create an element with a class of `synapseInput` that Synapse will automatically bind to anywhere in between your `<body></body>` tags:

```html
<input class='synapseInput' />
```

Add the default styles in between your `<head></head>` tags:

```html
<link rel='stylesheet' href='https://synapse-search.netlify.com/synapse-v1.css' />>
```

Add the JavaScript before your closing `</body>` tag:

```html
<script src='https://synapse-search.netlify.com/synapse-v1.js'></script>
```

That's it! Then just type something in the input element and hit enter. Synapse will automatically recursively crawl links starting with the ones found on the current page and deliver search results.

Additionally, you can also have any element toggle the search pane with the `synapseToggle` class:

```html
<a class='synapseToggle'>Show Search</a>
```

## Things to Consider

### Support

Synapse uses web workers to crawl data which are pretty performant, but don't work on all browsers. [Browser support for web workers is currently pretty good.](http://caniuse.com/#feat=webworkers) If the browser does not support web workers, your search inputs will be hidden with `visibility: hidden`. You can add your own CSS if you'd rather have different behavior. If the browser does not support web workers, a body class of `synapseNotSupported` will be added.

### Performance

While Synapse will work with any website, it is best used on small to medium size websites. Search results will be less accurate the more pages there are or if there's not a lot of hyperlinks on each page for it to crawl. For larger websites, [Algolia](https://www.algolia.com/) is a great alternative.

### Don't use Synapse if:

- You want to crawl multiple domains
- You want to crawl a different domain than where your search form exists
- You want to quickly search > 100 pages
- You need more complicated search parameters

### Use Synapse if:

- You just want a simple search function on your site with no bells & whistles
- You don't want to do any configuration
- You're cheap

## Todo

- Highlight searched term in results
- Ability to change which tag is searched (default: body)
- matchMinimum as option
- Batch limit option
- Add weight to page titles
- Minimum # of batches to search before giving up
