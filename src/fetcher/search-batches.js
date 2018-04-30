import { searchBatches } from './lunr'

async function asyncSearchBatches(term){
	let results = await searchBatches(term, this.options.matchThreshold)

	// Show display results
	results = results.map(result => {
		return this.display[result.ref]
	})
	//return []
	return results
}

export default asyncSearchBatches