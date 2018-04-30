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
	return new Promise((resolve, reject) => {
		id++
		callbacks[id] = resolve
		worker.postMessage(JSON.stringify({
			id,
			fn: 'prioritizeUrls',
			args: [ ...arguments ],
		}))
	})

}

export {
	prioritizeUrls
}