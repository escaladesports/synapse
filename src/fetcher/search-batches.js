async function searchBatches(term){
	let results = []
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
	console.log(this.display)
	results = results.map(result => {
		return this.display[result.ref]
	})
	return results
}

export default searchBatches