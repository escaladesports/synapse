import lunr from 'lunr'

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

	const displayContent = {}

	const index = lunr(function(){
		this.field('title')
		this.field('content')
		this.field('description')
		for (let i = 0; i < batch.length; i++) {
			displayContent[batch[i].url] = {
				title: batch[i].title,
				description: batch[i].description
			}
			this.add(batch[i])
		}
	})

	this.batches.push(index)
}

export default fetchBatch