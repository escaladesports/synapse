import lunr from 'lunr'

async function fetchBatch(){
	let batch = []
	if (!this.urls.length && !this.fetchedUrls.length){
		this.urls.push(this.options.origin)
	}
	console.log(this.options.batchSize)
	while (batch.length < this.options.batchSize) {
		if (!this.urls.length) {
			break
		}
		let promises = []
		while (this.urls.length && (batch.length + promises.length) < this.options.batchSize){
			let url = this.urls.shift()
			promises.push(this.fetchUrl(url))
		}
		let data = await Promise.all(promises)
		// Remove falsy items
		data = data.filter(item => !!item)
		batch = [
			...batch,
			...data,
		]
	}

	const displayContent = this.display

	const index = lunr(function(){
		this.field('title')
		this.field('content')
		this.field('description')
		for (let i = 0; i < batch.length; i++) {
			displayContent[batch[i].id] = {
				url: batch[i].id,
				title: batch[i].title,
				description: batch[i].description
			}
			this.add(batch[i])
		}
	})

	this.batches.push(index)
}

export default fetchBatch