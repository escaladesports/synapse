import lunr from 'lunr'
module.exports = function(){
	const worker = new Worker('query-worker-v1.js')
	worker.onmessage = e => {
		console.log(e.data)
		const idx = lunr.Index.load(JSON.parse(e.data))
		const results = idx.search(this.queryStr)
		this.render(results)
	}
	worker.postMessage(this.pageData)
}
