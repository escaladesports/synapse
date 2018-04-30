import { searchBatches } from './lunr'

async function searchMoreBatches(term) {
	let results = await searchBatches(term, this.options.matchThreshold, this.options.batchSearch)

	// Show display results
	results = results.map(result => {
		return this.display[result.ref]
	})

	return results
}

export default searchMoreBatches