import Worker from 'worker-loader!./lunr-worker.js'

let worker = new Worker()
let id = 0
let callbacks = {}

worker.addEventListener('message', e => {
	let obj = JSON.parse(e.data)
	if(callbacks[obj.id]){
		callbacks[obj.id](obj.res)
		delete callbacks[obj.id]
	}
})

function prioritizeUrls(){
	return callWorker('prioritizeUrls', [ ...arguments ])
}
function createBatch(){
	return callWorker('createBatch', [ ...arguments ])
}
function searchBatches(){
	return callWorker('searchBatches', [ ...arguments ])
}

function callWorker(fn, args){
	return new Promise((resolve, reject) => {
		id++
		callbacks[id] = resolve
		worker.postMessage(JSON.stringify({
			id,
			fn: fn,
			args: args,
		}))
	})
}

export {
	prioritizeUrls,
	createBatch,
	searchBatches,
}