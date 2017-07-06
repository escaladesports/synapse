import parse from './parse'
module.exports = function(){
	this.showLoader()
	if(!this.worker){
		this.worker = new Worker('fetch-worker-v1.js')
		this.worker.onmessage = e => {
			const data = JSON.parse(e.data)
			if(data.query){
				if('currentBatch' in data && data.currentBatch !== false){
					this.pageProgress = data.currentBatch
					console.log('Moved batch progress to ' + this.pageProgress)
				}
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
	const obj = {
		query: this.queryStr,
		url: this.url,
		batch: this.pageProgress
	}
	if(this.replaceDomain){
		obj.replaceDomain = this.replaceDomain
	}
	this.worker.postMessage(obj)
}
