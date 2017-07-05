module.exports = function(batch){
	if(!this.worker){
		this.worker = new Worker('fetch-worker-v1.js')
		this.worker.onmessage = e => {
			this.render(JSON.parse(e.data))
		}
	}
	this.worker.postMessage({
		query: this.queryStr,
		url: this.url,
		batch: this.pageProgress
	})
}
