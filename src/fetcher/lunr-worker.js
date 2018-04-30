import lunr from 'lunr'

let batches = []
let urlText = {}

function searchBatches(term, matchThreshold) {
	let results = []
	batches.forEach(batch => {
		let batchResults = batch.search(term)
		results.push(...batchResults)
	})

	// Remove low scores
	results = results.filter(result => {
		return result.score >= matchThreshold
	})

	// Sort by score
	results.sort((a, b) => {
		if (a.score < b.score) {
			return 1
		}
		if (a.score > b.score) {
			return -1
		}
		return 0
	})

	return results
}

function prioritizeUrls(urls, term){
	const urlIndex = lunr(function(){
		this.field('id')
		this.field('urlText')
		for (let i = urls.length; i--;) {
			this.add(urls[i])
		}
	})
	const res = urlIndex.search(term)
	return res
}

function createBatch(batch){
	const index = lunr(function () {
		this.field('id')
		this.field('title')
		this.field('content')
		this.field('description')
		for (let i = 0; i < batch.length; i++) {
			this.add(batch[i])
		}
	})
	batches.push(index)
}

const fns = {
	createBatch,
	searchBatches,
	prioritizeUrls,
}

self.addEventListener('message', e => {
	let { id, fn, args } = JSON.parse(e.data)
	let res = fns[fn](...args)
	self.postMessage(JSON.stringify({
		id,
		res,
	}))
})