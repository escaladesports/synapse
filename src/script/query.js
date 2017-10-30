import parse from './parse'
import fetch from 'isomorphic-fetch'

module.exports = function(){
	this.showLoader()

	getWorkerBlob()
		.then(blob => {
			if (!this.worker) {
				this.worker = new Worker(blob)
				this.worker.onmessage = e => {
					try {
						const data = JSON.parse(e.data)
						if (data.query) {
							if (data.query !== this.queryStr) return
							if ('currentBatch' in data && data.currentBatch !== false) {
								this.pageProgress = data.currentBatch
								console.log('Moved batch progress to ' + this.pageProgress)
							}
							this.render(data.results)
						}
						else {
							console.log('Parsing DOM data...')
							const obj = JSON.parse(e.data)
							obj.content = parse(obj.content)
							this.worker.postMessage(obj)
						}
					}
					catch(e){
						console.error(e)
						console.log('Worker returned:', e.data)
					}
				}
			}
			const obj = {
				query: this.queryStr,
				url: this.url || document.location.href,
				batch: this.pageProgress
			}
			if (this.replaceDomain) {
				obj.replaceDomain = this.replaceDomain
			}
			this.worker.postMessage(obj)
		})

}

let workerBlob
function getWorkerBlob(){
	if (workerBlob) return Promise.resolve(workerBlob)
	return fetch('https://synapse-search.netlify.com/synapse-v1.js')
		.then(res => res.text())
		.then(res => {
			res = new Blob([res])
			res = window.URL.createObjectURL(res)
			workerBlob = res
			return res
		})
}