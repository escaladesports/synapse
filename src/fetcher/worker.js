import fetch from 'isomorphic-fetch'


async function fetchPage(id){
	console.log(`Fetching: ${id}`)
	let data = await fetch(id)
	data = await data.text()
	return {
		id,
		data,
	}
}

async function fetchPages(urls, batchNum) {
	console.log(`Fetching pages...`)
	let fetches = []
	for (let i = 0; i < urls.length; i++) {
		if (fetches.length >= batchLimit) {
			break
		}
		fetches.push(fetchPage(urls[i]))
	}
	return Promise.all(fetches)
}


onmessage = e => {
	postMessage(`Received: ${e.data.a}`)
}




