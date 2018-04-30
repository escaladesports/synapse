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
	console.log('URL in:', urls)
	console.log('URL term:', term)
	const urlIndex = lunr(function(){
		this.field('id')
		this.field('urlText')
		for (let i = urls.length; i--;) {
			this.add(urls[i])
		}
	})
	const res = urlIndex.search(term)
	console.log('URL results:', res)
	return res
}

function createBatch(arr){

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