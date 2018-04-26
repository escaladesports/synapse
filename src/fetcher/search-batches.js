async function searchBatches(term){
	let results = []
	this.batches.forEach(batch => {
		let batchResults = batch.search(term)
		results.push(...batchResults)
	})
	console.log(results)
	// Remove low scores
	results = results.filter(result => {
		console.log(result.score)
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
	// Show display results
	results = results.map(result => {
		return this.display[result.ref]
	})
	return []
	return results
}

export default searchBatches