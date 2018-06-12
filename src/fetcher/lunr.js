import Worker from './lunr-worker.js'

//let worker = new Worker()
let id = 0
let callbacks = {}

/*
worker.addEventListener('message', e => {
	let obj = JSON.parse(e.data)
	if(callbacks[obj.id]){
		callbacks[obj.id](obj.res)
		delete callbacks[obj.id]
	}
})
*/

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
		let obj = Worker({
			id,
			fn,
			args,
		})
		if (callbacks[obj.id]) {
			callbacks[obj.id](obj.res)
			delete callbacks[obj.id]
		}
	})
}

export {
	prioritizeUrls,
	createBatch,
	searchBatches,
}