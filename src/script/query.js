module.exports = function(){
	const worker = new Worker('query-worker-v1.js')
	worker.onmessage = e => {
		worker.terminate()
		this.render(JSON.parse(e.data))
	}
	worker.postMessage({
		pageData: this.pageData,
		queryStr: this.queryStr
	})
}
