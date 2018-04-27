async function searchMoreBatches(term){
	let results = []

	for (
		let i = this.batches.length - this.options.batchSearch;
		i < this.batches.length;
		i++
	){
		console.log(`Searching batch ${i}`)
		let batch = this.batches[i]
		let batchResults = batch.search(term)
		results.push(...batchResults)
	}

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

	// Show display results
	results = results.map(result => {
		return this.display[result.ref]
	})

	return results
}

export default searchMoreBatches