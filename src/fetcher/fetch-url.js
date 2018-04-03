import fetch from 'isomorphic-fetch'

async function fetchUrl(url){
	let data = await fetch(url)
	let text = await data.text()
	let parsed = this.parsePage(url, text)
	return parsed
}

export default fetchUrl