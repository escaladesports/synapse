import lunr from 'lunr'

async function fetchBatch(term){
	let batch = []
	const urls = this.urls

	// Add origin if first time running
	if (!urls.length && !this.fetchedUrls.length){
		urls.push(this.options.origin)
	}

	// Prioritize URLs
	const urlIndex = lunr(function(){
		this.field('id')
		for (let i = urls.length; i--;){
			this.add({
				id: urls[i]
			})
		}
	})
	const urlResult = urlIndex.search(term)
	urlResult.forEach(res => {
		let url = res.ref
		urls.splice(urls.indexOf(url), 1)
		urls.unshift(url)
	})

	// Search URLs
	while (batch.length < this.options.batchSize) {
		if (!urls.length) break
		let promises = []
		while (urls.length && (batch.length + promises.length) < this.options.batchSize){
			let url = urls.shift()
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
		this.field('url')
		this.field('title')
		this.field('content')
		this.field('description')
		for (let i = 0; i < batch.length; i++) {
			displayContent[batch[i].url] = {
				url: batch[i].url,
				title: batch[i].title,
				description: batch[i].description
			}
			this.add(batch[i])
		}
	})

	this.batches.push(index)
}

export default fetchBatch