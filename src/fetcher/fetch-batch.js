async function fetchBatch(){
	let batch = []
	if (!this.urls.length && !this.fetchedUrls.length){
		this.urls.push(this.options.origin)
	}
	while (batch.length < this.options.batchLimit) {
		if (!this.urls.length) {
			break
		}
		let promises = []
		while(this.urls.length && (batch.length + promises.length) < this.options.batchLimit){
			let url = this.urls.shift()
			promises.push(this.fetchUrl(url))
		}
		let data = await Promise.all(promises)
		batch = [
			...batch,
			...data,
		]
	}
	console.log(batch)
	return batch
}

export default fetchBatch