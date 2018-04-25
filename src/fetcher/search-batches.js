async function searchBatches(term){
	const results = []
	this.batches.forEach(batch => {
		let batchResults = batch.search(term)
		results.push(...batchResults)
	})
	results.sort((a, b) => {
		if(a.score < b.score){
			return 1
		}
		if(a.score > b.score){
			return -1
		}
		return 0
	})
	return results
}

export default searchBatches