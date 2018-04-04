async function searchBatches(term){
	const results = []
	this.batches.forEach(batch => {
		let batchResults = batch.search(term)
		results.push(...batchResults)
	})
	console.log(results)
}

export default searchBatches