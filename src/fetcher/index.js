import fetchUrl from './fetch-url'
import fetchBatch from './fetch-batch'
import parsePage from './parse-page'
import searchBatches from './search-batches'
import searchMoreBatches from './search-more-batches'

class Fetcher {
	constructor(options) {
		this.options = {
			batchSize: 6,
			batchSearch: 3,
			matchThreshold: .007,
			contentSelector: 'body',
			title: 'title',
			description: 'meta[name="description"]',
			...options
		}
		this.batches = []
		this.display = {}
		this.urls = []
		this.fetchedUrls = []
		this.urlText = {}
		this.subscriptions = []
	}
	subscribe(fn) {
		this.subscriptions.push(fn)
	}
	unsubscribe(fn) {
		let index = this.subscriptions.indexOf(fn)
		if (index > -1) {
			this.subscriptions.splice(index, 1)
		}
	}
	triggerSubscriptions() {
		this.subscriptions.forEach(sub => {
			sub(this)
		})
	}
}

Fetcher.prototype = {
	fetchUrl,
	fetchBatch,
	parsePage,
	searchBatches,
	searchMoreBatches,
}


export default Fetcher