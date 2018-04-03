async function fetchBatch(){
	let batch = []
	while (batch.length < this.options.batchLimit) {
		if (!this.options.urls.length) {
			break
		}
		let promises = []
		while(this.options.urls.length && (batch.length + promises.length) < this.options.batchLimit){
			let url = this.options.urls.shift()
			promises.push(this.fetchUrl(url))
		}
		let data = await Promise.all(promises)
		batch = [
			...batch,
			...data,
		]
	}
	return batch
}

export default fetchBatch