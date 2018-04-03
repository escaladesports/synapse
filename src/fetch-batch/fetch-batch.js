async function fetchBatch(){
	let fetched = 0
	let batch = []
	while (fetched < this.options.batchLimit) {
		if (!this.options.urls.length) {
			break
		}
		let promises = []
		while(this.options.urls.length && fetched < this.options.batchLImit){
			let url = this.options.urls.shift()
			promises.push(this.fetchUrl(url))
			fetched++
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