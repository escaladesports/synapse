import parse from './parse'
module.exports = function(batch){
	if(!this.worker){
		this.worker = new Worker('fetch-worker-v1.js')
		this.worker.onmessage = e => {
			const data = JSON.parse(e.data)
			if(data.query){
				this.render(data.results)
			}
			else{
				console.log('Parsing DOM data...')
				const obj = JSON.parse(e.data)
				obj.content = parse(obj.content)
				this.worker.postMessage(obj)
			}
		}
	}
	this.worker.postMessage({
		query: this.queryStr,
		url: this.url,
		batch: this.pageProgress
	})
}
