import lunr from 'lunr'
import { prioritizeUrls, createBatch } from './lunr'

async function fetchBatch(term){
	let batch = []
	const urls = this.urls
	const urlText = this.urlText

	// Add origin if first time running
	if(!this.options.origin){
		this.options.origin = `${document.location.origin}/`
	}
	if (!urls.length && !this.fetchedUrls.length){
		urls.push(this.options.origin)
	}
	console.log(urls)

	// Prioritize URLs
	const urlResult = await prioritizeUrls(urls.map((id, key) => {
		return {
			id,
			urlText: urlText[id],
		}
	}), term)
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


	for (let i = 0; i < batch.length; i++) {
		this.display[batch[i].id] = {
			url: batch[i].id,
			title: batch[i].title,
			description: batch[i].description
		}
	}

	await createBatch(batch)
}

export default fetchBatch