async function searchBatches(term){
	let results = []
	this.batches.forEach(batch => {
		let batchResults = batch.search(term)
		results.push(...batchResults)
	})
	// Remove low scores
	results = results.filter(result => {
		return result.score >= this.options.matchThreshold
	})
	// Sort by score
	results.sort((a, b) => {
		if(a.score < b.score){
			return 1
		}
		if(a.score > b.score){
			return -1
		}
		return 0
	})
	console.log(results)
	// Show display results
	results = results.map(result => {
		return this.display[result.ref]
	})
	//return []
	return results
}

export default searchBatches