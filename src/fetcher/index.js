import fetchUrl from './fetch-url'
import fetchBatch from './fetch-batch'
import parsePage from './parse-page'

class Fetcher {
	constructor(options) {
		this.options = {
			origin: document.location.origin,
			batchLimit: 20,
			matchMinimum: .002,
			content: 'body',
			title: 'title',
			description: 'meta[name="description"]',
			...options
		}
		this.batches = []
		this.urls = []
		this.fetchedUrls = []
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
}


export default Fetcher