import fetch from 'isomorphic-fetch'

async function fetchUrl(url){
	let text
	try {
		let data = await fetch(url)
		text = await data.text()
	}
	catch(e){
		return false
	}
	let parsed = this.parsePage(url, text)
	return parsed
}

export default fetchUrl